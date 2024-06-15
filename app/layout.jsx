import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/store/store";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pic Museum",
  description: "Pic Museum enhances your visit with high-res images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
        <Footer />
      </body>
    </html>
  );
}
