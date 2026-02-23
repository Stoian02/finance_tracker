/**
 * Centralized Theme Color Configuration
 * 
 * This file contains all theme-aware colors used throughout the application.
 * Colors are organized by component/feature and provide both light and dark theme variants.
 * 
 * Usage:
 * 1. Import the themeColors object for Tailwind classes
 * 2. Use helper functions (getTooltipStyles, getChartColors) for dynamic colors
 * 3. Access nested properties for specific color needs
 * 
 * Example:
 * ```tsx
 * import { themeColors, getChartColors } from '@/lib/theme-colors'
 * import { useTheme } from 'next-themes'
 * 
 * function MyComponent() {
 *   const { theme } = useTheme()
 *   const chartColors = getChartColors(theme)
 *   // Use chartColors.axes, chartColors.legend, etc.
 * }
 * ```
 */

export const themeColors = {
  // Dashboard Stats
  stats: {
    income: {
      light: {
        text: 'text-green-600',
        bg: 'bg-green-50',
        iconBg: 'bg-green-100',
      },
      dark: {
        text: 'dark:text-green-400',
        bg: 'dark:bg-green-900/20',
        iconBg: 'dark:bg-green-800/30',
      },
    },
    expenses: {
      light: {
        text: 'text-red-600',
        bg: 'bg-red-50',
        iconBg: 'bg-red-100',
      },
      dark: {
        text: 'dark:text-red-400',
        bg: 'dark:bg-red-900/20',
        iconBg: 'dark:bg-red-800/30',
      },
    },
    balancePositive: {
      light: {
        text: 'text-blue-600',
        bg: 'bg-blue-50',
        iconBg: 'bg-blue-100',
      },
      dark: {
        text: 'dark:text-blue-400',
        bg: 'dark:bg-blue-900/20',
        iconBg: 'dark:bg-blue-800/30',
      },
    },
    balanceNegative: {
      light: {
        text: 'text-orange-600',
        bg: 'bg-orange-50',
        iconBg: 'bg-orange-100',
      },
      dark: {
        text: 'dark:text-orange-400',
        bg: 'dark:bg-orange-900/20',
        iconBg: 'dark:bg-orange-800/30',
      },
    },
    label: {
      light: 'text-gray-600',
      dark: 'dark:text-gray-300',
    },
  },

  // Charts
  charts: {
    axes: {
      light: '#6B7280', // gray-500
      dark: '#9CA3AF', // gray-400
    },
    tooltip: {
      light: {
        background: '#FFFFFF',
        border: '#E5E7EB',
        text: '#1F2937',
      },
      dark: {
        background: '#1F2937',
        border: '#374151',
        text: '#F9FAFB',
      },
    },
    legend: {
      light: '#4B5563', // gray-600
      dark: '#D1D5DB', // gray-300
    },
    pieLabel: {
      light: {
        text: '#1F2937',
        shadow: 'none',
      },
      dark: {
        text: '#F9FAFB',
        shadow: 'none',
      },
    },
    icon: {
      light: 'text-blue-600',
      dark: 'dark:text-blue-400',
    },
    emptyState: {
      light: 'text-gray-500',
      dark: 'dark:text-gray-400',
    },
  },

  // Table
  table: {
    header: {
      light: 'bg-gray-50',
      dark: 'dark:bg-gray-800',
    },
    rowHover: {
      light: 'hover:bg-gray-50',
      dark: 'dark:hover:bg-gray-800',
    },
    border: {
      light: 'border',
      dark: 'dark:border-gray-700',
    },
    emptyState: {
      light: 'text-gray-500',
      dark: 'dark:text-gray-400',
    },
  },

  // Buttons & Actions
  actions: {
    edit: {
      light: 'hover:bg-blue-50 hover:text-blue-600',
      dark: 'dark:hover:bg-blue-900/30 dark:hover:text-blue-400',
    },
    delete: {
      light: 'hover:bg-red-50 hover:text-red-600',
      dark: 'dark:hover:bg-red-900/30 dark:hover:text-red-400',
    },
    primary: {
      light: 'bg-blue-600 hover:bg-blue-700',
      dark: 'bg-blue-600 hover:bg-blue-700', // Same for both
      text: 'text-white',
    },
  },

  // Forms
  forms: {
    icon: {
      light: 'text-gray-400',
      dark: 'dark:text-gray-500',
    },
    helpText: {
      light: 'text-gray-500',
      dark: 'dark:text-gray-400',
    },
    categoryForm: {
      light: 'bg-gray-50',
      dark: 'dark:bg-gray-800',
    },
  },

  // Category Items
  category: {
    border: {
      light: 'border',
      dark: 'dark:border-gray-700',
    },
    badge: {
      light: 'text-gray-500 bg-gray-100',
      dark: 'dark:text-gray-400 dark:bg-gray-700',
    },
    colorPreview: {
      light: 'border-gray-300',
      dark: 'dark:border-gray-600',
    },
    colorPreviewHover: {
      light: 'hover:border-gray-500',
      dark: 'dark:hover:border-gray-400',
    },
  },

  // Month Selector
  monthSelector: {
    background: {
      light: 'bg-white',
      dark: 'dark:bg-gray-800',
    },
    button: {
      light: 'hover:bg-blue-50 hover:text-blue-600',
      dark: 'dark:hover:bg-blue-900/30 dark:hover:text-blue-400',
    },
    todayButton: {
      light: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
      dark: 'dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30',
    },
    icon: {
      light: 'text-blue-600',
      dark: 'dark:text-blue-400',
    },
  },

  // Layout
  layout: {
    background: {
      light: 'from-blue-50 via-white to-green-50',
      dark: 'dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
    },
    header: {
      light: 'bg-white/80 border-gray-200',
      dark: 'dark:bg-gray-900/80 dark:border-gray-700',
    },
  },
}

// Helper function to get theme-specific tooltip styles
export function getTooltipStyles(theme: string | undefined) {
  const isDark = theme === 'dark'
  return {
    backgroundColor: isDark ? themeColors.charts.tooltip.dark.background : themeColors.charts.tooltip.light.background,
    borderColor: isDark ? themeColors.charts.tooltip.dark.border : themeColors.charts.tooltip.light.border,
    color: isDark ? themeColors.charts.tooltip.dark.text : themeColors.charts.tooltip.light.text,
  }
}

// Helper function to get theme-specific chart colors
export function getChartColors(theme: string | undefined) {
  const isDark = theme === 'dark'
  return {
    axes: isDark ? themeColors.charts.axes.dark : themeColors.charts.axes.light,
    legend: isDark ? themeColors.charts.legend.dark : themeColors.charts.legend.light,
    pieLabel: {
      text: isDark ? themeColors.charts.pieLabel.dark.text : themeColors.charts.pieLabel.light.text,
      shadow: isDark ? themeColors.charts.pieLabel.dark.shadow : themeColors.charts.pieLabel.light.shadow,
    },
  }
}
