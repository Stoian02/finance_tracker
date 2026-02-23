'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Euro } from 'lucide-react'

interface IncomeFormProps {
  selectedMonth: Date
  onSuccess: () => void
}

export function IncomeForm({ selectedMonth, onSuccess }: IncomeFormProps) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [existingIncome, setExistingIncome] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchIncome()
  }, [selectedMonth])

  const fetchIncome = async () => {
    try {
      const month = selectedMonth?.getMonth() ? selectedMonth.getMonth() + 1 : new Date().getMonth() + 1
      const year = selectedMonth?.getFullYear() ? selectedMonth.getFullYear() : new Date().getFullYear()
      
      const res = await fetch(`/api/income?month=${month}&year=${year}`)
      const data = await res.json()
      
      if (data?.income) {
        setExistingIncome(data.income)
        setAmount(data.income.amount?.toString() ?? '')
      } else {
        setExistingIncome(null)
        setAmount('')
      }
    } catch (error) {
      console.error('Error fetching income:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const month = selectedMonth?.getMonth() ? selectedMonth.getMonth() + 1 : new Date().getMonth() + 1
      const year = selectedMonth?.getFullYear() ? selectedMonth.getFullYear() : new Date().getFullYear()

      const res = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          month,
          year,
        }),
      })

      if (!res.ok) throw new Error('Failed to save income')

      toast({
        title: 'Success',
        description: `Income ${existingIncome ? 'updated' : 'added'} successfully`,
      })

      onSuccess()
      fetchIncome()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save income',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="income">Monthly Income / Salary</Label>
        <div className="relative">
          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            id="income"
            type="number"
            step="0.01"
            placeholder="Enter your monthly income"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {existingIncome
            ? 'Update your income for this month'
            : 'Set your income for this month'}
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : existingIncome ? (
          'Update Income'
        ) : (
          'Set Income'
        )}
      </Button>
    </form>
  )
}
