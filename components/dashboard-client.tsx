'use client'

import { useState, useEffect } from 'react'
import { MonthSelector } from '@/components/month-selector'
import { DashboardStats } from '@/components/dashboard-stats'
import { ExpenseForm } from '@/components/expense-form'
import { ExpenseList } from '@/components/expense-list'
import { IncomeForm } from '@/components/income-form'
import { CategoryManager } from '@/components/category-manager'
import { SpendingChart } from '@/components/spending-chart'
import { ExpenseTrendChart } from '@/components/expense-trend-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function DashboardClient() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [refreshKey, setRefreshKey] = useState(0)
  const { toast } = useToast()

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Month Selector */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      {/* Dashboard Stats */}
      <DashboardStats
        selectedMonth={selectedMonth}
        refreshKey={refreshKey}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart
          selectedMonth={selectedMonth}
          refreshKey={refreshKey}
        />
        <ExpenseTrendChart
          selectedMonth={selectedMonth}
          refreshKey={refreshKey}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6 mt-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Add Expense
            </h2>
            <ExpenseForm onSuccess={handleRefresh} />
          </Card>

          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Expense History</h2>
            <ExpenseList
              selectedMonth={selectedMonth}
              refreshKey={refreshKey}
              onUpdate={handleRefresh}
            />
          </Card>
        </TabsContent>

        <TabsContent value="income" className="mt-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
            <IncomeForm
              selectedMonth={selectedMonth}
              onSuccess={handleRefresh}
            />
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <CategoryManager onUpdate={handleRefresh} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
