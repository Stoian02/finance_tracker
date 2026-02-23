'use client'

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format, addMonths, subMonths } from 'date-fns'

interface MonthSelectorProps {
  selectedMonth: Date
  onMonthChange: (date: Date) => void
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const handlePrevMonth = () => {
    onMonthChange(subMonths(selectedMonth, 1))
  }

  const handleNextMonth = () => {
    onMonthChange(addMonths(selectedMonth, 1))
  }

  const handleCurrentMonth = () => {
    onMonthChange(new Date())
  }

  const isCurrentMonth = format(selectedMonth, 'yyyy-MM') === format(new Date(), 'yyyy-MM')

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevMonth}
        className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <span className="text-xl font-semibold">
          {format(selectedMonth, 'MMMM yyyy')}
        </span>
        {!isCurrentMonth && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCurrentMonth}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
          >
            Today
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextMonth}
        className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
