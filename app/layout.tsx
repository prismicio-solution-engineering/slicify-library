import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "./favicon.ico"
  }
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
