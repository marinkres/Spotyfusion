"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function PrivacyPage() {
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
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> March 8, 2025<br />
              <strong>Last Updated:</strong> March 8, 2025
            </p>

            <h2 className="underline text-lg font-bold mb-2">Introduction</h2>
            <p>
              This Privacy Policy outlines how Mergify ("the App") collects, uses, and protects user data when interacting with the Spotify API. By using the App, you agree to the practices described in this policy. If you do not agree, please do not use the App.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Information We Collect</h2>
            <p>
              When you connect your Spotify account to the App, we request access to certain data through the following Spotify API scopes:
            </p>
            <ol>
              <li><strong>playlist-read-private</strong>: Access to your private playlists to enable playlist merging or management.</li>
              <li><strong>playlist-read-collaborative</strong>: Access to collaborative playlists for reading and merging purposes.</li>
              <li><strong>playlist-modify-private</strong>: Permission to create or modify private playlists during the merge process.</li>
              <li><strong>playlist-modify-public</strong>: Permission to create or modify public playlists if selected by the user.</li>
              <li><strong>user-read-private</strong>: Access to basic user information, such as your Spotify user ID.</li>
            </ol>

            <h2 className="underline text-lg font-bold mb-2 mt-2">How We Use Your Information</h2>
            <p>
              The data collected is used exclusively for the functionality of the App and includes:
            </p>
            <ul>
              <li>Reading private and collaborative playlists to display and merge them.</li>
              <li>Creating new playlists or modifying existing ones based on user input.</li>
              <li>Fetching basic user information (e.g., user ID) required for playlist creation.</li>
            </ul>
            <p>
              We do not collect, store, or share sensitive information such as your email address, listening history, or personal preferences outside of what is necessary for playlist merging.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Data Retention</h2>
            <p>
              We only process your data while you are actively using the App. Once you disconnect your Spotify account from the App, we cease all access and delete any cached data related to your account.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Data Sharing</h2>
            <p>
              We do not sell or share your personal data with third parties. The data accessed via Spotify API is used strictly within the scope of the App's functionality and is not disclosed externally.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">User Rights</h2>
            <p>
              You have the following rights regarding your data:
            </p>
            <ol>
              <li><strong>Access:</strong> You can view what permissions have been granted by checking your Spotify account settings.</li>
              <li><strong>Revocation:</strong> You can revoke access at any time by disconnecting your Spotify account from the App.</li>
              <li><strong>Deletion:</strong> Upon disconnection, all cached data related to your account will be deleted immediately.</li>
            </ol>

            <h2 className="underline text-lg font-bold mb-2 m-2">Cookies</h2>
            <p>
              The App does not use cookies or track browsing activities outside of its core functionality.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Third-Party Services</h2>
            <p>
              The App relies on Spotify's API for data access and processing. Please refer to <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Spotify's Privacy Policy</a> for details on how Spotify handles user data.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Security Measures</h2>
            <p>
              We implement industry-standard security practices to protect your data during transmission and processing. However, no system can guarantee absolute security.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be communicated through updates in the App interface or website.
            </p>

            <h2 className="underline text-lg font-bold mb-2 mt-2">Contact Us</h2>
            <p>
              For inquiries regarding this Privacy Policy or your data rights, please contact us at:<br />
              <strong>Email:</strong> support@Mergify.com<br />
            </p>

            <p className="mt-8">
              By using this App, you acknowledge that you understand and accept this Privacy Policy.
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
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
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
