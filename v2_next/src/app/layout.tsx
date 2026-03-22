import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "안정호의 책장",
    description: "안정호 book shelf2",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
