import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto py-6 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© 2025 Mergify. 🇪🇺</p>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-green-600"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-green-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-green-600"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
