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
      /* ========================================
         UFW-INSPIRED "CASTRO FOR GEORGIA" PALETTE
         "Action over status quo" / "Worker focused"
         High contrast, bold color blocks
         ======================================== */
      colors: {
        'campaign': {
          // Primary Greens - Agriculture & Growth
          'primary': '#197B50',       // Standard Green - main brand
          'primary-dark': '#396727',  // Dark Green - text, strong emphasis
          'primary-light': '#2A9D68', // Lighter green for hover
          
          // Accent Oranges/Reds - Energy, Urgency, Action
          'secondary': '#BE4703',     // Dark Orange/Rust - CTA
          'accent': '#DF5A3C',        // Bright Orange/Red - highlights
          'secondary-dark': '#9C3A02',// Darker rust for hover
          
          // Functional
          'success': '#197B50',
          'warning': '#BE4703',
        },
        // Direct color overrides for Tailwind utilities
        'campaign-primary': '#197B50',
        'campaign-primary-dark': '#396727',
        'campaign-secondary': '#BE4703',
        'campaign-accent': '#DF5A3C',
        
        // Neutral palette - warm undertones
        'neutral': {
          50: '#FAFAF8',
          100: '#F5F5F0',
          200: '#E8E8E0',
          300: '#D4D4C8',
          400: '#A3A396',
          500: '#737366',
          600: '#525248',
          700: '#3D3D35',
          800: '#292922',
          900: '#1A1A15',
        },
        
        // Background colors
        'cream': '#FFFDD0',         // Primary background
        'cream-dark': '#F5F0C4',    // Secondary background
        'peach': '#F5F0C4',         // Legacy alias
        
        // Accent greens (for compatibility)
        'green': {
          700: '#396727',
          600: '#197B50',
          500: '#2A9D68',
        },
        
        // Accent oranges (for compatibility)
        'orange': {
          700: '#9C3A02',
          600: '#BE4703',
          500: '#DF5A3C',
        },
      },
      
      /* ========================================
         UFW TYPOGRAPHY
         Bold, legible, ALL-CAPS headers
         ======================================== */
      fontFamily: {
        'sans': ['Open Sans', 'Arial', 'system-ui', 'sans-serif'],
        'heading': ['Bebas Neue', 'Arial Black', 'Impact', 'sans-serif'],
        'display': ['Bebas Neue', 'Arial Black', 'Impact', 'sans-serif'],
      },
      
      // Minimal border radius for crisp edges
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
        '2xl': '8px',
        'full': '9999px',
      },
      
      // Custom spacing for campaign content
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Animation for interactive elements
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
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