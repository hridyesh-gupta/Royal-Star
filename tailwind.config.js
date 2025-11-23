/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D71921',
        'brand-red-dark': '#991319',
        'brand-red-soft': '#FDE5E7',
        'brand-charcoal': '#111111',
        'brand-charcoal-soft': '#1F2933',
        'brand-cream': '#FFF4EC',
      },
    },
  },
  plugins: [],
}

