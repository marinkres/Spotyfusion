"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="/images/logo.png" alt="Mergify Logo" />
          </div>
          <Link href="/">
            <h1 className="text-xl font-bold">
              <span className="text-green-600"></span>Mergify
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-1 container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-25"></div>
            <div className="relative bg-card rounded-full h-full w-full flex items-center justify-center border border-border">
              <span className="text-4xl font-bold">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight">
            Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Oops! The playlist you're looking for seems to have skipped to the next track.
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white"
              asChild
            >
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Mergify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Github
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
