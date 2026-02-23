'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ExpenseForm } from '@/components/expense-form'
import { useToast } from '@/hooks/use-toast'
import { Edit, Trash2, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ExpenseListProps {
  selectedMonth: Date
  refreshKey: number
  onUpdate: () => void
}

export function ExpenseList({ selectedMonth, refreshKey, onUpdate }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingExpense, setEditingExpense] = useState<any>(null)
  const [deletingExpense, setDeletingExpense] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchExpenses()
  }, [selectedMonth, refreshKey])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const month = selectedMonth?.getMonth() ? selectedMonth.getMonth() + 1 : new Date().getMonth() + 1
      const year = selectedMonth?.getFullYear() ? selectedMonth.getFullYear() : new Date().getFullYear()
      
      const res = await fetch(`/api/expenses?month=${month}&year=${year}`)
      const data = await res.json()
      setExpenses(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingExpense) return

    try {
      const res = await fetch(`/api/expenses/${deletingExpense.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete expense')

      toast({
        title: 'Success',
        description: 'Expense deleted successfully',
      })

      setDeletingExpense(null)
      onUpdate()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No expenses recorded for this month
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense?.id} className="hover:bg-gray-50">
                <TableCell>
                  {expense?.date ? format(new Date(expense.date), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${expense?.category?.color ?? '#3B82F6'}20`,
                      color: expense?.category?.color ?? '#3B82F6',
                    }}
                  >
                    {expense?.category?.name ?? 'Unknown'}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {expense?.description || '-'}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${expense?.amount?.toFixed?.(2) ?? '0.00'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingExpense(expense)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingExpense(expense)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Update the details of this expense
            </DialogDescription>
          </DialogHeader>
          <ExpenseForm
            initialData={editingExpense}
            onSuccess={() => {
              setEditingExpense(null)
              onUpdate()
            }}
            onCancel={() => setEditingExpense(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingExpense} onOpenChange={(open) => !open && setDeletingExpense(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
