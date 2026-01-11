/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    '.my-class': {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  });
});

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Itim: ["Itim", "cursive"],
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        // Brand Colors (adjust if needed)
        primary: {
          50:  'hsl(var(--primary-50) / <alpha-value>)',
          100: 'hsl(var(--primary-100) / <alpha-value>)',
          200: 'hsl(var(--primary-200) / <alpha-value>)',
          300: 'hsl(var(--primary-300) / <alpha-value>)',
          400: 'hsl(var(--primary-400) / <alpha-value>)',
          500: 'hsl(var(--primary-500) / <alpha-value>)',
          600: 'hsl(var(--primary-600) / <alpha-value>)',
          700: 'hsl(var(--primary-700) / <alpha-value>)',
          800: 'hsl(var(--primary-800) / <alpha-value>)',
          900: 'hsl(var(--primary-900) / <alpha-value>)',
          950: 'hsl(var(--primary-950) / <alpha-value>)',
        },
        accent: 'hsl(var(--accent) / <alpha-value>)',

        // Backgrounds
        background: {
          darkest:  'hsl(var(--background-darkest) / <alpha-value>)',
          darker:   'hsl(var(--background-darker) / <alpha-value>)',
          default:  'hsl(var(--background-default) / <alpha-value>)',
          lighter:  'hsl(var(--background-lighter) / <alpha-value>)',
          lightest: 'hsl(var(--background-lightest) / <alpha-value>)',
        },

        // Foregrounds (Text Colors) - Custom for backwards compatibility
        'foreground-custom': {
          primary:   'hsl(var(--foreground-primary) / <alpha-value>)',
          secondary: 'hsl(var(--foreground-secondary) / <alpha-value>)',
          tertiary:  'hsl(var(--foreground-tertiary) / <alpha-value>)',
          inverted:  'hsl(var(--foreground-inverted) / <alpha-value>)',
        },
        // Backward compatibility alias
        foreground: {
          primary:   'hsl(var(--foreground-primary) / <alpha-value>)',
          secondary: 'hsl(var(--foreground-secondary) / <alpha-value>)',
          tertiary:  'hsl(var(--foreground-tertiary) / <alpha-value>)',
          inverted:  'hsl(var(--foreground-inverted) / <alpha-value>)',
        },

        // Borders and Dividers - Custom for backwards compatibility
        'border-custom': {
          default: 'hsl(var(--border-default) / <alpha-value>)',
          dark:    'hsl(var(--border-dark) / <alpha-value>)',
          light:   'hsl(var(--border-light) / <alpha-value>)',
        },
        // Backward compatibility alias
        border: {
          default: 'hsl(var(--border-default) / <alpha-value>)',
          dark:    'hsl(var(--border-dark) / <alpha-value>)',
          light:   'hsl(var(--border-light) / <alpha-value>)',
        },

        // Card Specific (custom - keeping for backwards compatibility)
        'card-custom': {
          background: 'hsl(var(--card-background) / <alpha-value>)',
          border:     'hsl(var(--card-border) / <alpha-value>)',
        },
        // Backward compatibility alias
        card: {
          background: 'hsl(var(--card-background) / <alpha-value>)',
          border:     'hsl(var(--card-border) / <alpha-value>)',
        },

        // Standard Design Tokens are defined in CSS variables and work directly with Tailwind v4
        // No need to define them here as they'll be picked up automatically
      },
      boxShadow: {
        'custom-glow': '0 0 15px rgba(255, 170, 0, 0.6)', // Golden glow
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14.0deg)" },
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.8s ease-in",
        slideUp: "slideUp 0.8s ease-out",
        fadeIn: "fadeIn 0.8s ease-in",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        wave: "wave 2s linear infinite",
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/hero-pattern.svg')",
      },
    },
  },
  plugins: [
    Myclass,
    // Add custom plugin for hiding scrollbars
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
};
