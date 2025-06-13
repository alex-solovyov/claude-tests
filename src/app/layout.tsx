import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Claude AI",
  description: "Claude AI test requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
