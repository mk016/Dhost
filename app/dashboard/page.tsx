"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  Clock, 
  Code, 
  Copy, 
  ExternalLink, 
  FileUp, 
  Globe, 
  HardDrive, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Trash2, 
  Upload 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data for deployments
const mockDeployments = [
  {
    id: "dep_1",
    name: "My Portfolio",
    domain: "portfolio.eth",
    status: "active",
    url: "https://ipfs.io/ipfs/Qm...",
    createdAt: "2025-04-10T14:30:00Z",
    storage: "IPFS",
    size: "4.2 MB"
  },
  {
    id: "dep_2",
    name: "NFT Gallery",
    domain: "nftgallery.crypto",
    status: "active",
    url: "https://ipfs.io/ipfs/Qm...",
    createdAt: "2025-04-05T10:15:00Z",
    storage: "Arweave",
    size: "12.8 MB"
  },
  {
    id: "dep_3",
    name: "DeFi Dashboard",
    domain: "defi.decenthost.io",
    status: "building",
    url: "",
    createdAt: "2025-04-12T09:45:00Z",
    storage: "IPFS",
    size: "8.5 MB"
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("deployments");
  const [deployments, setDeployments] = useState(mockDeployments);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your decentralized websites</p>
            </div>
            <Button onClick={handleUpload} className="mt-4 md:mt-0 group">
              {isUploading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                  New Deployment
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue="deployments" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deployments" className="space-y-4">
              {deployments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {deployments.map((deployment) => (
                    <motion.div
                      key={deployment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex items-center">
                              <div className="mr-4 p-2 rounded-md bg-muted">
                                {deployment.storage === "IPFS" ? (
                                  <HardDrive className="h-6 w-6 text-blue-500" />
                                ) : (
                                  <Globe className="h-6 w-6 text-purple-500" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{deployment.name}</h3>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm text-muted-foreground">{deployment.domain}</span>
                                  {deployment.status === "active" && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                                      Live
                                    </span>
                                  )}
                                  {deployment.status === "building" && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                                      Building
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-4 md:mt-0 space-x-2">
                              <div className="flex items-center text-sm text-muted-foreground mr-4">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(deployment.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-muted-foreground mr-4">
                                {deployment.size}
                              </div>
                              {deployment.status === "active" && (
                                <Button variant="outline" size="sm" className="mr-2">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Visit
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy URL
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Code className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Redeploy
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No deployments yet</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Deploy your first website to get started with decentralized hosting
                    </p>
                    <Button onClick={handleUpload}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Deployment
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="domains">
              <Card>
                <CardHeader>
                  <CardTitle>Domains</CardTitle>
                  <CardDescription>
                    Manage your Web3 domains and subdomains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Domain management content will go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View statistics for your deployments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analytics content will go here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Settings content will go here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}