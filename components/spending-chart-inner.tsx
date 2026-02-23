'use client'

import { Card } from '@/components/ui/card'
import { PieChart as PieChartIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

interface SpendingChartInnerProps {
  data: any[]
  visibleCategories: Set<string>
  toggleCategory: (categoryName: string) => void
}

export function SpendingChartInner({ data, visibleCategories, toggleCategory }: SpendingChartInnerProps) {
  const filteredData = data?.filter?.((item) => visibleCategories.has(item?.name)) ?? []

  if (!data || data.length === 0) {
    return (
      <Card className="p-6 shadow-md">
        <div className="flex flex-col items-center justify-center h-80 text-gray-500">
          <PieChartIcon className="h-12 w-12 mb-2" />
          <p>No spending data for this month</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <PieChartIcon className="h-5 w-5 text-blue-600" />
        Spending by Category
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) =>
              percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
            }
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {filteredData?.map?.((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry?.color ?? '#3B82F6'} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => `$${value?.toFixed?.(2) ?? '0.00'}`}
            contentStyle={{ fontSize: 11 }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Category Filters */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm font-medium mb-3">Filter Categories:</p>
        <div className="grid grid-cols-2 gap-2">
          {data?.map?.((category) => (
            <div key={category?.name} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category?.name}`}
                checked={visibleCategories.has(category?.name)}
                onCheckedChange={() => toggleCategory(category?.name)}
              />
              <Label
                htmlFor={`cat-${category?.name}`}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category?.color ?? '#3B82F6' }}
                />
                {category?.name} (${category?.value?.toFixed?.(2) ?? '0.00'})
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
