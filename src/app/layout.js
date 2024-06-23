import {Inter} from "next/font/google";
import "./globals.css";
import Loading from "@/app/loading";
import {Suspense} from "react";
import CommonLayout from "@/components/common-layout";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
            <Suspense fallback={<Loading/>}>
                <CommonLayout
                    attribute="class"
                    defaultTheme="system"
                    children={children}/>
            </Suspense>
            <Toaster/>
            </body>
            </html>
        </ClerkProvider>
    );
}
