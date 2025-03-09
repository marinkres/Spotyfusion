"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <img src="/images/logo.png" alt="Mergify Logo" />
          </div>
          <Link href="/">
            <h1 className="text-xl font-bold">
              <span className="text-green-600">Spoty</span>Merge
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Mergify ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Mergify is a web application that allows users to merge multiple Spotify playlists into a single playlist. The Service requires authentication with a Spotify account.
            </p>

            <h2>3. Spotify Account</h2>
            <p>
              To use Mergify, you must have a valid Spotify account. Your use of Spotify's services is subject to Spotify's own Terms of Service and Privacy Policy. Mergify is not affiliated with Spotify.
            </p>

            <h2>4. User Data and Privacy</h2>
            <p>
              Mergify accesses your Spotify playlists only with your explicit permission. We do not store your Spotify credentials. We may store playlist information temporarily to facilitate the merging process. For more details, please refer to our Privacy Policy.
            </p>

            <h2>5. Limitations of Service</h2>
            <p>
              Mergify is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. The Service depends on Spotify's API and may be affected by changes to that API.
            </p>

            <h2>6. User Conduct</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Service, including but not limited to design, text, graphics, and code, are owned by Mergify and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2>8. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms of Service at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@Mergify.com.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Last updated: March 9, 2025
            </p>
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
              href="/privacy"
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
              href="https://github.com/marinkres/Spotyfusion"
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
