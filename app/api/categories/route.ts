import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Predefined categories
const PREDEFINED_CATEGORIES = [
  { name: 'Groceries', color: '#10B981', icon: '🛒' },
  { name: 'Food', color: '#F59E0B', icon: '🍔' },
  { name: 'Restaurants', color: '#EF4444', icon: '🍽️' },
  { name: 'Transportation', color: '#3B82F6', icon: '🚗' },
  { name: 'Utilities', color: '#8B5CF6', icon: '💡' },
  { name: 'Entertainment', color: '#EC4899', icon: '🎬' },
  { name: 'Healthcare', color: '#06B6D4', icon: '⚕️' },
  { name: 'Shopping', color: '#F97316', icon: '🛍️' },
  { name: 'Bills', color: '#6366F1', icon: '📄' },
  { name: 'Other', color: '#64748B', icon: '📦' },
]

// GET all categories
export async function GET() {
  try {
    // Check if we need to seed predefined categories
    const count = await prisma.category.count()
    
    if (count === 0) {
      // Seed predefined categories
      await prisma.category.createMany({
        data: PREDEFINED_CATEGORIES.map(cat => ({
          name: cat.name,
          color: cat.color,
          icon: cat.icon,
          isCustom: false,
        })),
      })
    }

    const categories = await prisma.category.findMany({
      orderBy: [
        { isCustom: 'asc' },
        { name: 'asc' },
      ],
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, color, isCustom, icon } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name },
    })

    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        color: color || '#3B82F6',
        isCustom: isCustom ?? true,
        icon: icon || null,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
