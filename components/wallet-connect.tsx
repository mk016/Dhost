"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, Wallet, Shield, HardDrive, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { connectWallet } from "@/lib/web3-utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function WalletConnect() {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check if ethereum is available
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          const ethereum = (window as any).ethereum;
          
          // Get connected accounts
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            
            // Get chain ID
            const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
            setChainId(parseInt(chainIdHex, 16));
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const result = await connectWallet();
      
      if (result) {
        setWalletAddress(result.address);
        setChainId(result.chainId);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${shortenAddress(result.address)}`,
        });
      } else {
        setError("Failed to connect wallet. Please try again.");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect wallet. Please try again.");
      
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet";
      case 5:
        return "Goerli Testnet";
      case 11155111:
        return "Sepolia Testnet";
      case 137:
        return "Polygon";
      case 80001:
        return "Mumbai Testnet";
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">DecentHost</CardTitle>
                <CardDescription>
                  Connect your wallet to deploy to the decentralized web
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {walletAddress ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Wallet Connected</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {shortenAddress(walletAddress)}
                        </p>
                        {chainId && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Network: {getNetworkName(chainId)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Deploy to Decentralized Storage</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                          <HardDrive className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                          <p className="font-medium">IPFS</p>
                        </div>
                        <div className="border rounded-lg p-4 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                          <HardDrive className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                          <p className="font-medium">Arweave</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <Wallet className="h-16 w-16 text-primary/80" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-center">Why Connect Your Wallet?</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Secure authentication without passwords</span>
                        </li>
                        <li className="flex items-start">
                          <HardDrive className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Deploy directly to decentralized storage</span>
                        </li>
                      </ul>
                    </div>
                    
                    {error && (
                      <div className="p-3 bg-destructive/10 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                {walletAddress ? (
                  <Button className="w-full" asChild>
                    <Link href="/deploy">
                      Continue to Deployment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}