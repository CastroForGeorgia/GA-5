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
      // Original Castro Campaign color palette
      colors: {
        'campaign': {
          'primary': '#2E8B57',    // Vibrant Verde (Forest Green)
          'primary-dark': '#228B22', // Darker green for hover states
          'primary-light': '#90EE90', // Lighter green for backgrounds
          'secondary': '#C0392B',   // Bold Rojo (Deep Red)
          'secondary-dark': '#A93226', // Darker red for hover states  
          'secondary-light': '#E74C3C', // Lighter red for accents
          'success': '#2E8B57',     // Use primary green for success
          'warning': '#D97706',     // Keep orange for warnings
        },
        // Direct color overrides to ensure proper application
        'campaign-primary': '#2E8B57',
        'campaign-secondary': '#C0392B',
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
          },
        // Original campaign background colors
        'cream': '#FFFDD0',      // Cream White
        'peach': '#FFDAB9',      // Peach Georgia  
        'sky': '#87CEEB',        // Sky Blue
        'indigo': '#4B0082'      // Deep Indigo
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