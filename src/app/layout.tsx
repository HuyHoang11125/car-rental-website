import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ÉLITE | Cho Thuê Xe Sang",
  description: "Trải nghiệm dịch vụ cho thuê xe sang đẳng cấp. Xe cao cấp, dịch vụ concierge chuyên nghiệp, hành trình khó quên.",
  keywords: "cho thuê xe sang, xe cao cấp, thuê xe hạng sang, ÉLITE, xe thể thao",
  openGraph: {
    title: "ÉLITE | Cho Thuê Xe Sang",
    description: "Lái Xe Đẳng Cấp. Trải nghiệm những chiếc xe danh giá nhất thế giới.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
