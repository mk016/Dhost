import Link from "next/link";
import { HardDrive } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <HardDrive className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-bold">DecentHost</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Deploy your websites to the decentralized web with one click.
            </p>
          </div>
              
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
              <li><Link href="/status" className="text-muted-foreground hover:text-foreground transition-colors">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DecentHost. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
              <Link href="https://discord.com" className="text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}