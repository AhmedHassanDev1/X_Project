
import "./globals.css";
import "./animate.css"
import Providers from "@/components/provider/index"
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <Providers>
      <body className={`body ${inter.className}`}>
        {children}
        {modal}
        <ToastContainer />
      </body>
    </Providers>

  );
}
