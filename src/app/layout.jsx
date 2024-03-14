import "./globals.css";
import { Rubik } from "next/font/google";

// components
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "TicketsApp",
  description:
    "Introducing TicketApp: Your go-to solution for seamless ticket management. Built with the cutting-edge technology of Next.js 14, styled with the flexibility of TailwindCSS, and backed by the robust MongoDB for secure data handling, TicketApp offers a comprehensive CRUD functionality within a responsive design that ensures a consistent user experience across all devices. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
