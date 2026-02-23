'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Plus } from 'lucide-react'
import { format } from 'date-fns'

interface ExpenseFormProps {
  onSuccess: () => void
  initialData?: any
  onCancel?: () => void
}

export function ExpenseForm({ onSuccess, initialData, onCancel }: ExpenseFormProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: initialData?.amount?.toString() ?? '',
    categoryId: initialData?.categoryId ?? '',
    date: initialData?.date ? format(new Date(initialData.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    description: initialData?.description ?? '',
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.categoryId) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const url = initialData ? `/api/expenses/${initialData.id}` : '/api/expenses'
      const method = initialData ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          categoryId: formData.categoryId,
          date: new Date(formData.date).toISOString(),
          description: formData.description,
        }),
      })

      if (!res.ok) throw new Error('Failed to save expense')

      toast({
        title: 'Success',
        description: `Expense ${initialData ? 'updated' : 'added'} successfully`,
      })

      if (!initialData) {
        setFormData({
          amount: '',
          categoryId: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          description: '',
        })
      }

      onSuccess()
      if (onCancel) onCancel()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save expense',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map?.((category) => (
                <SelectItem key={category?.id} value={category?.id ?? ''}>
                  {category?.name ?? 'Unknown'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Optional notes..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={1}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : initialData ? (
            'Update Expense'
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add Expense
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
