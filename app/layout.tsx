import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import GithubLink from "@/components/github-link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <footer className="w-full absolute bottom-0 p-3">
          <GithubLink />
        </footer>
      </body>
    </html>
  );
}
