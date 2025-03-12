"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//cta seciton 
export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Deploy to the Decentralized Web?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers building the future of the web with DecentHost.
          </p>
          <div className="mt-10">
            <Button size="lg" className="group" asChild>
              <Link href="/deploy">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}