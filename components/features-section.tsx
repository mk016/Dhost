"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  CloudCog, 
  Code, 
  Database, 
  FileCode, 
  Globe, 
  HardDrive, 
  Lock, 
  Rocket, 
  Shield, 
  Wallet 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  //Data
const features = [
  {
    icon: <HardDrive className="h-10 w-10 text-blue-500" />,
    title: "Decentralized Storage",
    description: "Store your website on IPFS and Arweave for permanent, censorship-resistant hosting."
  },
  {
    icon: <Rocket className="h-10 w-10 text-purple-500" />,
    title: "One-Click Deployment",
    description: "Deploy your static website in seconds with our simple drag-and-drop interface."
  },
  {
    icon: <Globe className="h-10 w-10 text-green-500" />,
    title: "Web3 Domains",
    description: "Connect your ENS or Unstoppable Domains for a truly decentralized web presence."
  },
  {
    icon: <Wallet className="h-10 w-10 text-orange-500" />,
    title: "Wallet Authentication",
    description: "Secure login with your Web3 wallet. No passwords, no hassle."
  },
  {
    icon: <Shield className="h-10 w-10 text-red-500" />,
    title: "Permanent Storage",
    description: "Your content stays online forever with Arweave's permanent storage solution."
  },
  {
    icon: <Code className="h-10 w-10 text-indigo-500" />,
    title: "GitHub Integration",
    description: "Connect your GitHub repository for automatic deployments on every push."
  },
  {
    icon: <FileCode className="h-10 w-10 text-teal-500" />,
    title: "Custom Domains",
    description: "Use your own domain or get a free decenthost.io subdomain for your project."
  },
  {
    icon: <CloudCog className="h-10 w-10 text-cyan-500" />,
    title: "IPFS Gateway",
    description: "Fast content delivery through optimized IPFS gateways for better performance."
  },
  {
    icon: <Database className="h-10 w-10 text-amber-500" />,
    title: "Analytics Dashboard",
    description: "Track visits, storage usage, and performance metrics for your deployments."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for Web3 Hosting
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to deploy and manage your decentralized websites
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border bg-card/50 backdrop-blur-sm hover:shadow-md transition-all group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-background/80 border">
                      {feature.icon}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}