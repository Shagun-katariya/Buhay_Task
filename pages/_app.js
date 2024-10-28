import "@/styles/globals.css";
//Global Layout and Styling
//Persistent State and Context Providers
//Customizing the App's Root Structure:
//Page-Level Props

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
