import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET income for a specific month
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = parseInt(searchParams.get('month') ?? '0')
    const year = parseInt(searchParams.get('year') ?? '0')

    if (!month || !year) {
      return NextResponse.json({ error: 'Month and year are required' }, { status: 400 })
    }

    const income = await prisma.income.findUnique({
      where: {
        month_year: {
          month,
          year,
        },
      },
    })

    return NextResponse.json({ income })
  } catch (error) {
    console.error('Error fetching income:', error)
    return NextResponse.json({ error: 'Failed to fetch income' }, { status: 500 })
  }
}

// POST create or update income
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, month, year, source } = body

    if (!amount || !month || !year) {
      return NextResponse.json(
        { error: 'Amount, month, and year are required' },
        { status: 400 }
      )
    }

    const income = await prisma.income.upsert({
      where: {
        month_year: {
          month: parseInt(month),
          year: parseInt(year),
        },
      },
      update: {
        amount: parseFloat(amount),
        source: source || 'Salary',
      },
      create: {
        amount: parseFloat(amount),
        month: parseInt(month),
        year: parseInt(year),
        source: source || 'Salary',
      },
    })

    return NextResponse.json(income)
  } catch (error) {
    console.error('Error saving income:', error)
    return NextResponse.json({ error: 'Failed to save income' }, { status: 500 })
  }
}
