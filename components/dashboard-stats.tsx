'use client'

import { useEffect, useState } from 'react'
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface DashboardStatsProps {
  selectedMonth: Date
  refreshKey: number
}

interface Stats {
  totalIncome: number
  totalExpenses: number
  balance: number
}

export function DashboardStats({ selectedMonth, refreshKey }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [selectedMonth, refreshKey])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const month = selectedMonth?.getMonth() ? selectedMonth.getMonth() + 1 : new Date().getMonth() + 1
      const year = selectedMonth?.getFullYear() ? selectedMonth.getFullYear() : new Date().getFullYear()
      
      const [incomeRes, expensesRes] = await Promise.all([
        fetch(`/api/income?month=${month}&year=${year}`),
        fetch(`/api/expenses?month=${month}&year=${year}`),
      ])

      const incomeData = await incomeRes.json()
      const expensesData = await expensesRes.json()

      const totalIncome = incomeData?.income?.amount ?? 0
      const totalExpenses = Array.isArray(expensesData)
        ? expensesData.reduce((sum: number, exp: any) => sum + (exp?.amount ?? 0), 0)
        : 0

      setStats({
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({ totalIncome: 0, totalExpenses: 0, balance: 0 })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Income',
      value: stats?.totalIncome ?? 0,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      iconBg: 'bg-green-100 dark:bg-green-800/30',
    },
    {
      title: 'Total Expenses',
      value: stats?.totalExpenses ?? 0,
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      iconBg: 'bg-red-100 dark:bg-red-800/30',
    },
    {
      title: 'Balance',
      value: stats?.balance ?? 0,
      icon: Wallet,
      color: (stats?.balance ?? 0) >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400',
      bg: (stats?.balance ?? 0) >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20',
      iconBg: (stats?.balance ?? 0) >= 0 ? 'bg-blue-100 dark:bg-blue-800/30' : 'bg-orange-100 dark:bg-orange-800/30',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`p-6 ${stat.bg} border-none shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  €{loading ? '...' : stat.value.toFixed(2)}
                </p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
