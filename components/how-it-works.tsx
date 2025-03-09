"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileUp, Globe, HardDrive, Rocket } from "lucide-react";

const steps = [
  {
    icon: <FileUp className="h-12 w-12 text-blue-500" />,
    title: "Upload Your Files",
    description: "Drag and drop your static website files or connect your GitHub repository for automatic deployments."
  },
  {
    icon: <HardDrive className="h-12 w-12 text-purple-500" />,
    title: "Store on IPFS/Arweave",
    description: "Your files are uploaded to decentralized storage networks, ensuring permanent and censorship-resistant hosting."
  },
  {
    icon: <Globe className="h-12 w-12 text-green-500" />,
    title: "Connect Web3 Domain",
    description: "Link your ENS (.eth) or Unstoppable Domain (.crypto) or use our free subdomain for your website."
  },
  {
    icon: <Rocket className="h-12 w-12 text-orange-500" />,
    title: "Deploy & Go Live",
    description: "Your website is instantly deployed and accessible worldwide through optimized IPFS gateways."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Deploy your website to the decentralized web in four simple steps
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-background border shadow-lg mb-6">
                    {step.icon}
                    <div className="absolute -right-3 -bottom-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="mt-6 md:hidden">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}