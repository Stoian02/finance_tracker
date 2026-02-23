'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const ExpenseTrendChartInner = dynamic(
  () => import('./expense-trend-chart-inner').then((mod) => mod.ExpenseTrendChartInner),
  {
    ssr: false,
    loading: () => (
      <Card className="p-6 shadow-md">
        <div className="flex items-center justify-center h-80">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </Card>
    ),
  }
)

interface ExpenseTrendChartProps {
  selectedMonth: Date
  refreshKey: number
}

export function ExpenseTrendChart({ selectedMonth, refreshKey }: ExpenseTrendChartProps) {
  const [data, setData] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [categoryColors, setCategoryColors] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    fetchData()
  }, [selectedMonth, refreshKey])

  const fetchData = async () => {
    try {
      setLoading(true)
      const month = selectedMonth?.getMonth() ? selectedMonth.getMonth() + 1 : new Date().getMonth() + 1
      const year = selectedMonth?.getFullYear() ? selectedMonth.getFullYear() : new Date().getFullYear()
      
      const res = await fetch(`/api/expenses?month=${month}&year=${year}`)
      const expenses = await res.json()

      if (!Array.isArray(expenses) || expenses.length === 0) {
        setData([])
        setCategories([])
        return
      }

      // Get unique categories and their colors
      const uniqueCategories = new Set<string>()
      const colorMap = new Map<string, string>()
      expenses.forEach((expense: any) => {
        const categoryName = expense?.category?.name ?? 'Unknown'
        uniqueCategories.add(categoryName)
        if (!colorMap.has(categoryName)) {
          colorMap.set(categoryName, expense?.category?.color ?? '#3B82F6')
        }
      })

      const categoryList = Array.from(uniqueCategories)
      setCategories(categoryList)
      setVisibleCategories(new Set(categoryList))
      setCategoryColors(colorMap)

      // Group expenses by date and category
      const dateMap = new Map()

      expenses.forEach((expense: any) => {
        const date = expense?.date ? format(parseISO(expense.date), 'MMM dd') : 'Unknown'
        const categoryName = expense?.category?.name ?? 'Unknown'
        const amount = expense?.amount ?? 0

        if (!dateMap.has(date)) {
          dateMap.set(date, { date, total: 0 })
        }

        const dateEntry = dateMap.get(date)
        dateEntry[categoryName] = (dateEntry[categoryName] || 0) + amount
        dateEntry.total += amount
      })

      const chartData = Array.from(dateMap.values()).sort((a, b) => {
        const dateA = new Date(a.date + ', ' + year)
        const dateB = new Date(b.date + ', ' + year)
        return dateA.getTime() - dateB.getTime()
      })

      setData(chartData)
    } catch (error) {
      console.error('Error fetching expense trend data:', error)
      setData([])
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (categoryName: string) => {
    setVisibleCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <Card className="p-6 shadow-md">
        <div className="flex items-center justify-center h-80">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </Card>
    )
  }

  return (
    <ExpenseTrendChartInner
      data={data}
      categories={categories}
      visibleCategories={visibleCategories}
      categoryColors={categoryColors}
      toggleCategory={toggleCategory}
    />
  )
}
