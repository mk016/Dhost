"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/file-upload";
import { GithubConnector } from "@/components/github-connector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowRight, 
  FileUp, 
  Github, 
  Globe, 
  HardDrive, 
  Info, 
  Loader2, 
  Upload 
} from "lucide-react";
import { motion } from "framer-motion";
import { uploadToIPFS, uploadToArweave } from "@/lib/web3-utils";
import { useToast } from "@/hooks/use-toast";

export default function DeployPage() {
  const { toast } = useToast();
  const [deployMethod, setDeployMethod] = useState<"upload" | "github">("upload");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  
  // Domain settings
  const [domainType, setDomainType] = useState<"subdomain" | "custom" | "ens" | "unstoppable">("subdomain");
  const [customDomain, setCustomDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  
  // Storage settings
  const [storageType, setStorageType] = useState<"ipfs" | "arweave">("ipfs");
  const [permanentStorage, setPermanentStorage] = useState(false);
  
  // GitHub settings
  const [repoDetails, setRepoDetails] = useState<{
    repoUrl: string;
    branch: string;
    buildCommand?: string;
    outputDir?: string;
  } | null>(null);
  
  const handleUploadComplete = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    toast({
      title: "Files uploaded successfully",
      description: `${uploadedFiles.length} files are ready for deployment.`,
    });
  };
  
  const handleGithubConnect = (details: {
    repoUrl: string;
    branch: string;
    buildCommand?: string;
    outputDir?: string;
  }) => {
    setRepoDetails(details);
    toast({
      title: "GitHub repository connected",
      description: `Ready to deploy from ${details.repoUrl}.`,
    });
  };
  
  const handleDeploy = async () => {
    if (deployMethod === "upload" && files.length === 0) {
      toast({
        title: "No files to deploy",
        description: "Please upload files before deploying.",
        variant: "destructive",
      });
      return;
    }
    
    if (deployMethod === "github" && !repoDetails) {
      toast({
        title: "No repository connected",
        description: "Please connect a GitHub repository before deploying.",
        variant: "destructive",
      });
      return;
    }
    
    if (domainType === "custom" && !customDomain) {
      toast({
        title: "Domain required",
        description: "Please enter a custom domain.",
        variant: "destructive",
      });
      return;
    }
    
    if (domainType === "subdomain" && !subdomain) {
      toast({
        title: "Subdomain required",
        description: "Please enter a subdomain.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeploying(true);
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let deployHash;
      if (storageType === "ipfs") {
        deployHash = await uploadToIPFS(files);
      } else {
        deployHash = await uploadToArweave(files);
      }
      
      if (!deployHash) {
        throw new Error("Failed to upload files");
      }
      
      // Generate a mock deployment URL based on domain settings
      let url;
      if (domainType === "subdomain") {
        url = `https://${subdomain}.decenthost.io`;
      } else if (domainType === "custom") {
        url = `https://${customDomain}`;
      } else if (domainType === "ens") {
        url = `https://${customDomain}.eth.limo`;
      } else {
        url = `https://${customDomain}.crypto`;
      }
      
      setDeploymentUrl(url);
      setDeploymentComplete(true);
      
      toast({
        title: "Deployment successful!",
        description: `Your website is now live at ${url}`,
      });
    } catch (error) {
      console.error("Deployment error:", error);
      toast({
        title: "Deployment failed",
        description: "There was an error deploying your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-2">Deploy Your Website</h1>
              <p className="text-muted-foreground mb-8">
                Upload your files or connect your GitHub repository to deploy to the decentralized web.
              </p>
            </motion.div>
            
            {deploymentComplete ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HardDrive className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Deployment Successful!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your website is now live on the decentralized web.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                      <Button asChild>
                        <a href={deploymentUrl} target="_blank" rel="noopener noreferrer">
                          Visit Website
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setDeploymentComplete(false);
                        setFiles([]);
                        setRepoDetails(null);
                      }}>
                        Deploy Another Website
                      </Button>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-left">
                      <p className="font-medium mb-2">Deployment Details:</p>
                      <p className="text-sm">
                        <span className="font-medium">URL:</span> {deploymentUrl}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Storage:</span> {storageType.toUpperCase()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Permanent:</span> {permanentStorage ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Deployment Method</CardTitle>
                    <CardDescription>
                      Select how you want to deploy your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upload" onValueChange={(value) => setDeployMethod(value as "upload" | "github")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">
                          <FileUp className="h-4 w-4 mr-2" />
                          Upload Files
                        </TabsTrigger>
                        <TabsTrigger value="github">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload" className="pt-6">
                        <FileUpload 
                          onUploadComplete={handleUploadComplete}
                          acceptedFileTypes={[
                            "text/html",
                            "text/css",
                            "application/javascript",
                            "image/jpeg",
                            "image/png",
                            "image/svg+xml",
                            "image/gif",
                            "application/json",
                            "font/woff",
                            "font/woff2"
                          ]}
                        />
                      </TabsContent>
                      
                      <TabsContent value="github" className="pt-6">
                        <GithubConnector onConnect={handleGithubConnect} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Domain Settings</CardTitle>
                    <CardDescription>
                      Choose how users will access your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      defaultValue="subdomain" 
                      value={domainType}
                      onValueChange={(value) => setDomainType(value as any)}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="subdomain" id="subdomain" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="subdomain" className="font-medium">
                            DecentHost Subdomain (Free)
                          </Label>
                          <div className="flex items-center">
                            <Input 
                              placeholder="your-site" 
                              className="max-w-[200px]"
                              value={subdomain}
                              onChange={(e) => setSubdomain(e.target.value)}
                              disabled={domainType !== "subdomain"}
                            />
                            <span className="ml-2 text-muted-foreground">.decenthost.io</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="custom" id="custom" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="custom" className="font-medium">
                            Custom Domain
                          </Label>
                          <Input 
                            placeholder="example.com" 
                            className="max-w-[300px]"
                            value={customDomain}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            disabled={domainType !== "custom"}
                          />
                          <p className="text-xs text-muted-foreground">
                            You'll need to update your DNS settings to point to our servers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="ens" id="ens" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="ens" className="font-medium">
                            ENS Domain (.eth)
                          </Label>
                          <div className="flex items-center">
                            <Input 
                              placeholder="yourname" 
                              className="max-w-[200px]"
                              value={customDomain}
                              onChange={(e) => setCustomDomain(e.target.value)}
                              disabled={domainType !== "ens"}
                            />
                            <span className="ml-2 text-muted-foreground">.eth</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You must own this ENS domain and set its content hash after deployment.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="unstoppable" id="unstoppable" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="unstoppable" className="font-medium">
                            Unstoppable Domain
                          </Label>
                          <div className="flex items-center">
                            <Input 
                              placeholder="yourname" 
                              className="max-w-[200px]"
                              value={customDomain}
                              onChange={(e) => setCustomDomain(e.target.value)}
                              disabled={domainType !== "unstoppable"}
                            />
                            <span className="ml-2 text-muted-foreground">.crypto</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You must own this Unstoppable Domain and set its IPFS hash after deployment.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Settings</CardTitle>
                    <CardDescription>
                      Choose where and how your website will be stored
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup 
                      defaultValue="ipfs" 
                      value={storageType}
                      onValueChange={(value) => setStorageType(value as "ipfs" | "arweave")}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="ipfs" id="ipfs" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="ipfs" className="font-medium flex items-center">
                            <HardDrive className="h-4 w-4 text-blue-500 mr-2" />
                            IPFS
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Distributed file storage with fast deployment. Content is cached by nodes in the network.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="arweave" id="arweave" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="arweave" className="font-medium flex items-center">
                            <HardDrive className="h-4 w-4 text-purple-500 mr-2" />
                            Arweave
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Permanent storage with one-time payment. Your content will be available forever.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {storageType === "arweave" && (
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="permanent" 
                          checked={permanentStorage}
                          onCheckedChange={setPermanentStorage}
                        />
                        <Label htmlFor="permanent" className="font-medium">
                          Permanent Storage
                        </Label>
                      </div>
                    )}
                    
                    <div className="bg-muted p-4 rounded-lg flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">Storage Information</p>
                        <p className="text-muted-foreground mt-1">
                          {storageType === "ipfs" 
                            ? "IPFS storage is distributed across nodes in the network. For long-term persistence, consider pinning your content or using Arweave."
                            : "Arweave provides permanent storage with a one-time payment. Your content will be stored forever on the permaweb."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={handleDeploy} 
                  disabled={isDeploying}
                  size="lg"
                  className="w-full"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Deploy to {storageType.toUpperCase()}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}