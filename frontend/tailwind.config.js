/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './content/**/*.md',
    './content/**/*.html',
    './*.html',
    './*.md',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      // Custom color palette for political campaign
      colors: {
        'campaign': {
          'primary': '#1D4ED8',    // Strong blue for trust/reliability
          'primary-dark': '#1E40AF',
          'primary-light': '#3B82F6',
          'secondary': '#DC2626',   // Red accent for urgency/action
          'secondary-dark': '#B91C1C',
          'secondary-light': '#EF4444',
          'success': '#059669',     // Green for hope/progress
          'warning': '#D97706',     // Orange for attention
          'neutral': {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      
      // Typography scale
      fontFamily: {
        'sans': ['Lato', 'system-ui', 'sans-serif'],
        'heading': ['Outfit', 'system-ui', 'sans-serif'],
      },
      
      // Custom spacing for campaign content
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Animation for interactive elements
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 