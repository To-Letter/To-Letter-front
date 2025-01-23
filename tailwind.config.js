/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/guide/**/*.{js,ts,jsx,tsx,mdx}", // guide 폴더 전체
    "./src/components/organisms/guide/**/*.{js,ts,jsx,tsx,mdx}", // guide 관련 컴포넌트
    "./src/components/molecules/**/*.{js,ts,jsx,tsx,mdx}", // SlideCard 컴포넌트
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
};
