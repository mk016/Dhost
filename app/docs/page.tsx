"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Book, 
  Code, 
  FileText, 
  Github, 
  HardDrive, 
  Info, 
  LifeBuoy, 
  Rocket, 
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 lg:w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search documentation..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Getting Started</p>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#introduction">
                      <Rocket className="mr-2 h-4 w-4" />
                      Introduction
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#quick-start">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Quick Start
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Core Concepts</p>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#decentralized-storage">
                      <HardDrive className="mr-2 h-4 w-4" />
                      Decentralized Storage
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#web3-domains">
                      <Globe className="mr-2 h-4 w-4" />
                      Web3 Domains
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Guides</p>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#github-integration">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Integration
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#custom-domains">
                      <Globe className="mr-2 h-4 w-4" />
                      Custom Domains
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Resources</p>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#api-reference">
                      <Code className="mr-2 h-4 w-4" />
                      API Reference
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#faq">
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="space-y-10">
                <div>
                  <h1 className="text-3xl font-bold mb-4" id="introduction">DecentHost Documentation</h1>
                  <p className="text-muted-foreground text-lg">
                    Welcome to the DecentHost documentation. Learn how to deploy your websites to decentralized storage with ease.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" id="quick-start">Quick Start</h2>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Deploy in 3 simple steps</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                            1
                          </div>
                          <h4 className="font-medium">Upload Files</h4>
                        </div>
                        <p className="text-muted-foreground">
                          Drag and drop your website files or connect your GitHub repository.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                            2
                          </div>
                          <h4 className="font-medium">Configure Options</h4>
                        </div>
                        <p className="text-muted-foreground">
                          Choose storage type, domain settings, and deployment options.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                            3
                          </div>
                          <h4 className="font-medium">Deploy</h4>
                        </div>
                        <p className="text-muted-foreground">
                          Click deploy and your site will be live on the decentralized web.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/deploy">
                          <Rocket className="mr-2 h-4 w-4" />
                          Start Deploying Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" id="decentralized-storage">Decentralized Storage</h2>
                  
                  <Tabs defaultValue="ipfs">
                    <TabsList>
                      <TabsTrigger value="ipfs">IPFS</TabsTrigger>
                      <TabsTrigger value="arweave">Arweave</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ipfs" className="space-y-4 pt-4">
                      <div className="flex items-start">
                        <HardDrive className="h-8 w-8 text-blue-500 mr-4 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold">InterPlanetary File System (IPFS)</h3>
                          <p className="text-muted-foreground">
                            IPFS is a distributed system for storing and accessing files, websites, applications, and data.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Content-addressed storage</li>
                          <li>Decentralized file distribution</li>
                          <li>Efficient content delivery</li>
                          <li>Censorship resistance</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Best For:</h4>
                        <p className="text-muted-foreground">
                          Static websites, content distribution, and applications that need fast access but don't require permanent storage.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">
                          <Info className="h-4 w-4 inline mr-2" />
                          IPFS content is cached by nodes in the network. For long-term persistence, consider pinning your content or using Arweave.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="arweave" className="space-y-4 pt-4">
                      <div className="flex items-start">
                        <HardDrive className="h-8 w-8 text-purple-500 mr-4 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold">Arweave</h3>
                          <p className="text-muted-foreground">
                            Arweave is a decentralized storage network that aims to provide permanent data storage.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Permanent storage (pay once, store forever)</li>
                          <li>Blockchain-based data persistence</li>
                          <li>Censorship resistance</li>
                          <li>Data immutability</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Best For:</h4>
                        <p className="text-muted-foreground">
                          Archival websites, important documents, historical records, and applications that need permanent availability.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">
                          <Info className="h-4 w-4 inline mr-2" />
                          Arweave storage requires a one-time payment based on the size of your data. This payment ensures your data remains available forever.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" id="github-integration">GitHub Integration</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Github className="h-8 w-8 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold">Connecting Your GitHub Repository</h3>
                        <p className="text-muted-foreground">
                          Deploy directly from your GitHub repository with automatic updates on every push.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Step-by-Step Guide:</h4>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">1. Connect Your GitHub Account</h5>
                          <p className="text-muted-foreground">
                            Click the "Connect GitHub" button in the deployment page and authorize DecentHost to access your repositories.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">2. Select Repository</h5>
                          <p className="text-muted-foreground">
                            Choose the repository containing your website files from the dropdown list.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">3. Configure Build Settings</h5>
                          <p className="text-muted-foreground">
                            Specify the branch to deploy, build command, and output directory if your site needs to be built.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">4. Enable Auto-Deployments (Optional)</h5>
                          <p className="text-muted-foreground">
                            Toggle the auto-deploy option to automatically deploy your site when you push changes to the selected branch.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">
                          <Info className="h-4 w-4 inline mr-2" />
                          GitHub integration works with public and private repositories. For private repositories, you'll need to grant appropriate permissions during the connection process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" id="faq">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">What types of websites can I deploy?</h3>
                      <p className="text-muted-foreground mt-1">
                        DecentHost is designed for static websites and single-page applications (SPAs). This includes sites built with HTML, CSS, JavaScript, React, Vue, Angular, Next.js (static export), and similar frameworks.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">How long does it take to deploy a website?</h3>
                      <p className="text-muted-foreground mt-1">
                        Most deployments complete within seconds to a few minutes, depending on the size of your website and the chosen storage network. Larger sites may take longer to upload and process.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">Can I use my own domain name?</h3>
                      <p className="text-muted-foreground mt-1">
                        Yes! You can use traditional domain names (.com, .io, etc.), ENS domains (.eth), or Unstoppable Domains (.crypto, .nft, etc.) with your DecentHost deployments.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">Is my content truly decentralized?</h3>
                      <p className="text-muted-foreground mt-1">
                        Yes. When you deploy to IPFS or Arweave, your content is stored on a distributed network of nodes rather than a single server. This provides censorship resistance and improved availability.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">What's the difference between IPFS and Arweave storage?</h3>
                      <p className="text-muted-foreground mt-1">
                        IPFS is designed for distributed content addressing and delivery, while Arweave focuses on permanent storage. IPFS content may need to be pinned to ensure long-term availability, whereas Arweave content is stored permanently with a one-time payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function Globe(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}