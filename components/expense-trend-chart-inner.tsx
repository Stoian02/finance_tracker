'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useTheme } from 'next-themes'
import { getChartColors, getTooltipStyles } from '@/lib/theme-colors'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

interface ExpenseTrendChartInnerProps {
  data: any[]
  categories: string[]
  visibleCategories: Set<string>
  categoryColors: Map<string, string>
  toggleCategory: (categoryName: string) => void
}

export function ExpenseTrendChartInner({
  data,
  categories,
  visibleCategories,
  categoryColors,
  toggleCategory,
}: ExpenseTrendChartInnerProps) {
  const { theme } = useTheme()
  const chartColors = getChartColors(theme)
  const tooltipStyles = getTooltipStyles(theme)
  
  if (!data || data.length === 0) {
    return (
      <Card className="p-6 shadow-md">
        <div className="flex flex-col items-center justify-center h-80 text-gray-500 dark:text-gray-400">
          <TrendingUp className="h-12 w-12 mb-2" />
          <p>No expense trends for this month</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        Daily Expense Trends
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: chartColors.axes }}
            tickLine={false}
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -15,
              style: { textAnchor: 'middle', fontSize: 11, fill: chartColors.axes },
            }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: chartColors.axes }}
            tickLine={false}
            label={{
              value: 'Amount (€)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: chartColors.axes },
            }}
          />
          <Tooltip
            formatter={(value: any) => `€${value?.toFixed?.(2) ?? '0.00'}`}
            contentStyle={{ 
              fontSize: 11, 
              ...tooltipStyles,
              borderRadius: '6px',
              padding: '8px 12px'
            }}
            itemStyle={{ color: tooltipStyles.color }}
            labelStyle={{ color: tooltipStyles.color, fontWeight: 'bold' }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value: string) => <span style={{ color: chartColors.legend }}>{value}</span>}
          />
          {categories
            ?.filter?.((cat) => visibleCategories.has(cat))
            ?.map?.((category) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={categoryColors.get(category) ?? '#3B82F6'}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Category Filters */}
      <div className="mt-6 border-t dark:border-gray-700 pt-4">
        <p className="text-sm font-medium mb-3">Filter Categories:</p>
        <div className="grid grid-cols-2 gap-2">
          {categories?.map?.((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`trend-${category}`}
                checked={visibleCategories.has(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`trend-${category}`}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors.get(category) ?? '#3B82F6' }}
                />
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
