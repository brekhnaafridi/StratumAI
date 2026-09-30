/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stratum: {
          base: '#050816',
          surface: '#0F172A',
          elevated: '#1E293B',
          subtle: '#162032',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.18)',
          blue: '#3B82F6',
          'blue-hover': '#2563EB',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
          text: '#F1F5F9',
          muted: '#94A3B8',
          dim: '#64748B',
        },
        // Backward compatibility mappings
        background: {
          DEFAULT: '#050816',
          secondary: '#0F172A',
        },
        surface: {
          DEFAULT: '#0F172A',
          alt: '#1E293B',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        neu: {
          base: '#050816',
          surface: '#0F172A',
          'surface-alt': '#1E293B',
          primary: '#3B82F6',
          'primary-dark': '#1D4ED8',
          'primary-light': '#60A5FA',
          accent: '#F59E0B',
          'accent-dark': '#D97706',
          'accent-light': '#FEF3C7',
          indigo: '#6366F1',
          text: '#F1F5F9',
          muted: '#94A3B8',
          secondary: '#475569',
          icon: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      borderRadius: {
        'stratum-sm': '8px',
        'stratum': '14px',
        'stratum-lg': '20px',
        'stratum-xl': '28px',
      },
      boxShadow: {
        'glass-sm': '0 2px 12px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'glass': '0 8px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-lg': '0 16px 48px -12px rgba(0, 0, 0, 0.6), 0 0 40px -8px rgba(99, 102, 241, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'glass-glow': '0 0 25px 0 rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-glow-indigo': '0 0 30px 0 rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        // Legacy compat
        'stratum-sm': '0 2px 12px -2px rgba(0, 0, 0, 0.4)',
        'stratum': '0 8px 32px -8px rgba(0, 0, 0, 0.5)',
        'stratum-lg': '0 16px 48px -12px rgba(0, 0, 0, 0.6), 0 0 40px -8px rgba(99, 102, 241, 0.08)',
        'stratum-glow': '0 0 25px 0 rgba(59, 130, 246, 0.25)',
        'stratum-glow-indigo': '0 0 30px 0 rgba(99, 102, 241, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backdropBlur: {
        'glass': '20px',
        'glass-heavy': '32px',
      },
    },
  },
  plugins: [],
}
