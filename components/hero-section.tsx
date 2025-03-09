"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-32 sm:py-40 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
              Deploy Your Web to the Decentralized Future
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              One-click deployment to IPFS and Arweave. Get your site online in seconds with Web3 domains and decentralized storage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="group" asChild>
              <Link href="/deploy">
                <Upload className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                Start Deploying
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link href="/docs">
              <Button variant="outline" size="lg">
                Read the Docs
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background/50 backdrop-blur shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-14 bg-muted/50 backdrop-blur-sm border-b flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto bg-background/80 rounded-full px-4 py-1 text-xs text-muted-foreground">
                decenthost.io/dashboard
              </div>
            </div>
            <div className="pt-14 pb-8 px-4">
              <div className="w-full h-[400px] bg-card rounded-lg border shadow-sm flex items-center justify-center">
                <div className="text-center p-8">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium">Drag and drop your files here</h3>
                  <p className="text-muted-foreground mt-2">or click to browse</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}