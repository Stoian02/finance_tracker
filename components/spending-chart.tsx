'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const SpendingChartInner = dynamic(
  () => import('./spending-chart-inner').then((mod) => mod.SpendingChartInner),
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

interface SpendingChartProps {
  selectedMonth: Date
  refreshKey: number
}

export function SpendingChart({ selectedMonth, refreshKey }: SpendingChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set())

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

      if (!Array.isArray(expenses)) {
        setData([])
        return
      }

      // Group by category
      const categoryMap = new Map()
      expenses.forEach((expense: any) => {
        const categoryName = expense?.category?.name ?? 'Unknown'
        const categoryColor = expense?.category?.color ?? '#3B82F6'
        const amount = expense?.amount ?? 0

        if (categoryMap.has(categoryName)) {
          const existing = categoryMap.get(categoryName)
          categoryMap.set(categoryName, {
            ...existing,
            value: existing.value + amount,
          })
        } else {
          categoryMap.set(categoryName, {
            name: categoryName,
            value: amount,
            color: categoryColor,
          })
        }
      })

      const chartData = Array.from(categoryMap.values())
      setData(chartData)
      setVisibleCategories(new Set(chartData.map(d => d?.name)))
    } catch (error) {
      console.error('Error fetching spending data:', error)
      setData([])
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
    <SpendingChartInner
      data={data}
      visibleCategories={visibleCategories}
      toggleCategory={toggleCategory}
    />
  )
}
