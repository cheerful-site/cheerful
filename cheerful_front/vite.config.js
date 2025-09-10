import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let baseURL = "http://localhost:8080";

  if (mode === "sojeong") {
    baseURL = "https://petcheerful.store";
  } else if (mode === "mikyung") {
    baseURL = "https://cheerful123.store";
  } else if (mode === "jongbo") {
    baseURL = "https://cheerfulpet.store";
  } else {
    baseURL = "http://localhost:8080";
  }

  return {
    plugins: [react()],
    define: {
      __API_HOST__:JSON.stringify(baseURL),
    }
  };
})
