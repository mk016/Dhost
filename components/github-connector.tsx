"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Check, AlertCircle, Loader2, RefreshCw, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GithubConnectorProps {
  onConnect: (repoDetails: {
    repoUrl: string;
    branch: string;
    buildCommand?: string;
    outputDir?: string;
  }) => void;
}

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  private: boolean;
  updated_at: string;
}

interface Branch {
  name: string;
}

export function GithubConnector({ onConnect }: GithubConnectorProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<"connect" | "select" | "configure">("connect");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // GitHub data
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  
  // Form state
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [branch, setBranch] = useState("main");
  const [buildCommand, setBuildCommand] = useState("");
  const [outputDir, setOutputDir] = useState("");
  
  // Check if GitHub token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (token) {
      setIsConnected(true);
      fetchRepositories(token);
    }
  }, []);
  
  const fetchRepositories = async (token: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be a server-side API call
      const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=10", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const data = await response.json();
      setRepositories(data);
      setStep("select");
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError("Failed to fetch repositories. Please try again.");
      
      // For demo purposes, set mock repositories
      setRepositories([
        {
          name: "personal-website",
          full_name: "username/personal-website",
          description: "My personal portfolio website built with Next.js",
          html_url: "https://github.com/username/personal-website",
          private: false,
          updated_at: "2025-04-10T14:30:00Z"
        },
        {
          name: "blog",
          full_name: "username/blog",
          description: "Static blog built with Gatsby",
          html_url: "https://github.com/username/blog",
          private: false,
          updated_at: "2025-04-05T10:15:00Z"
        },
        {
          name: "react-components",
          full_name: "username/react-components",
          description: "A collection of reusable React components",
          html_url: "https://github.com/username/react-components",
          private: true,
          updated_at: "2025-04-12T09:45:00Z"
        }
      ]);
      setStep("select");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchBranches = async (repo: Repository) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be a server-side API call
      const token = localStorage.getItem("github_token");
      const response = await fetch(`https://api.github.com/repos/${repo.full_name}/branches`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch branches");
      }
      
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      
      // For demo purposes, set mock branches
      setBranches([
        { name: "main" },
        { name: "develop" },
        { name: "feature/new-design" },
        { name: "staging" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConnect = () => {
    setIsConnecting(true);
    setError(null);
    
    // Simulate GitHub OAuth connection
    setTimeout(() => {
      // In a real app, this would redirect to GitHub OAuth
      const mockToken = "github_mock_token_" + Math.random().toString(36).substring(2);
      localStorage.setItem("github_token", mockToken);
      
      setIsConnecting(false);
      setIsConnected(true);
      fetchRepositories(mockToken);
      
      toast({
        title: "GitHub connected",
        description: "Successfully connected to your GitHub account",
      });
    }, 1500);
  };
  
  const handleRepoSelect = (repo: Repository) => {
    setSelectedRepo(repo);
    setRepoUrl(repo.html_url);
    fetchBranches(repo);
    setStep("configure");
  };
  
  const handleSubmit = () => {
    if (!repoUrl) {
      setError("Repository URL is required");
      return;
    }
    
    if (!branch) {
      setError("Branch is required");
      return;
    }
    
    onConnect({
      repoUrl,
      branch,
      buildCommand: buildCommand || undefined,
      outputDir: outputDir || undefined,
    });
    
    toast({
      title: "Repository connected",
      description: `Ready to deploy from ${repoUrl}`,
    });
  };
  
  const handleManualEntry = () => {
    setStep("configure");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6">
      {step === "connect" && (
        <Card>
          <CardHeader>
            <CardTitle>Connect to GitHub</CardTitle>
            <CardDescription>
              Deploy directly from your GitHub repository
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Github className="h-10 w-10" />
              <div>
                <h3 className="font-medium">GitHub Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your GitHub account to deploy your repositories
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting || isConnected}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : isConnected ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Connected to GitHub
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  Connect to GitHub
                </>
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleManualEntry}
              className="w-full"
            >
              Enter Repository Details Manually
            </Button>
          </CardContent>
        </Card>
      )}
      
      {step === "select" && (
        <Card>
          <CardHeader>
            <CardTitle>Select Repository</CardTitle>
            <CardDescription>
              Choose the repository you want to deploy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing your most recently updated repositories
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => fetchRepositories(localStorage.getItem("github_token") || "")}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {repositories.map((repo) => (
                    <div 
                      key={repo.full_name}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleRepoSelect(repo)}
                    >
                      <div className="flex items-center overflow-hidden">
                        <Github className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                        <div className="overflow-hidden">
                          <div className="flex items-center">
                            <p className="font-medium truncate">{repo.name}</p>
                            {repo.private && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                                Private
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{repo.description || "No description"}</p>
                          <p className="text-xs text-muted-foreground">
                            Updated {formatDate(repo.updated_at)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleManualEntry}
                  className="w-full"
                >
                  Enter Repository Details Manually
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
      
      {step === "configure" && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Deployment</CardTitle>
            <CardDescription>
              Set up your repository deployment settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedRepo && (
              <div className="flex items-center p-3 bg-muted/50 rounded-md mb-4">
                <Github className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedRepo.full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRepo.description || "No description"}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input 
                id="repo-url" 
                placeholder="https://github.com/username/repo" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              {branches.length > 0 ? (
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.name} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  id="branch" 
                  placeholder="main" 
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="build-command">Build Command (Optional)</Label>
              <Input 
                id="build-command" 
                placeholder="npm run build" 
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for static sites that don't require building
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="output-dir">Output Directory (Optional)</Label>
              <Input 
                id="output-dir" 
                placeholder="dist" 
                value={outputDir}
                onChange={(e) => setOutputDir(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The directory containing your built files (e.g., dist, build, out)
              </p>
            </div>
            
            {error && (
              <div className="flex items-center text-destructive text-sm p-2 bg-destructive/10 rounded">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            
            <Button 
              onClick={handleSubmit}
              className="w-full mt-2"
            >
              <Code className="mr-2 h-4 w-4" />
              Continue with Repository
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}