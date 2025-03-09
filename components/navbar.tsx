"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Github, HardDrive, Home, Menu, Wallet, X } from "lucide-react";
import { connectWallet } from "@/lib/web3-utils";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          const ethereum = (window as any).ethereum;
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = async () => {
    try {
      const result = await connectWallet();
      
      if (result) {
        setWalletAddress(result.address);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${shortenAddress(result.address)}`,
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <HardDrive className="w-6 h-6" />
            DecentHost
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:text-primary">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/databases" className="flex items-center gap-2 hover:text-primary">
              <Database className="w-4 h-4" />
              Databases
            </Link>
            <Link href="https://github.com/decenthost" className="flex items-center gap-2 hover:text-primary">
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {walletAddress ? (
            <Button variant="outline" onClick={() => {}}>
              <Wallet className="w-4 h-4 mr-2" />
              {shortenAddress(walletAddress)}
            </Button>
          ) : (
            <Button onClick={handleConnectWallet}>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/databases"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Database className="w-4 h-4" />
              Databases
            </Link>
            <Link
              href="https://github.com/decenthost"
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}