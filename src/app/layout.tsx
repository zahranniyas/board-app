import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Board App",
  description: "Board App Dashboard",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="grid min-h-screen grid-rows-[80px_1fr] grid-cols-[288px_1fr]">
          {/* Header */}
          <div className="row-start-1 col-span-2">
            <Header />
          </div>
          {/* Sidebar */}
          <div className="row-start-2 col-start-1">
            <Sidebar />
          </div>
          {/* Content */}
          <main className="row-start-2 col-start-2 overflow-y-auto bg-neutral-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
