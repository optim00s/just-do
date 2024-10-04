import "./globals.css";

export const metadata = {
  title: "just-do",
  description: "a to-do without distracted stuffs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-white text-black dark:bg-black dark:text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
