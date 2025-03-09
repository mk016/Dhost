/**
 * Utility functions for Web3 interactions
 */

// Function to connect wallet
export const connectWallet = async (): Promise<{ address: string; chainId: number } | null> => {
  try {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.");
      }
      
      // Get chain ID
      const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
      const chainId = parseInt(chainIdHex, 16);
      
      return {
        address: accounts[0],
        chainId: chainId
      };
    } else {
      throw new Error("MetaMask not found. Please install MetaMask to continue.");
    }
  } catch (error: any) {
    console.error("Error connecting wallet:", error);
    
    // Handle specific MetaMask errors
    if (error.code === 4001) {
      throw new Error("Connection rejected. Please approve the connection request.");
    }
    
    throw error;
  }
};

// Function to upload to IPFS
export const uploadToIPFS = async (files: File[]): Promise<string | null> => {
  try {
    // In a real implementation, this would use the IPFS HTTP client
    console.log(`Uploading ${files.length} files to IPFS...`);
    
    // Simulate IPFS upload with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Return a mock IPFS hash
    return "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
};

// Function to upload to Arweave
export const uploadToArweave = async (files: File[]): Promise<string | null> => {
  try {
    // In a real implementation, this would use the Arweave JS SDK or Bundlr
    console.log(`Uploading ${files.length} files to Arweave...`);
    
    // Simulate Arweave upload with a delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Return a mock Arweave transaction ID
    return "ar://7YXYLVxLKHGMHgVDpLZXHUvHeVDpVKJcyAEtQz-fFOQ";
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return null;
  }
};

// Function to resolve ENS domain
export const resolveENS = async (ensName: string): Promise<string | null> => {
  try {
    // In a real implementation, this would use ethers.js provider to resolve ENS
    console.log(`Resolving ENS name: ${ensName}`);
    
    // Simulate ENS resolution
    if (ensName.endsWith(".eth")) {
      return "0x1234567890123456789012345678901234567890";
    }
    return null;
  } catch (error) {
    console.error("Error resolving ENS:", error);
    return null;
  }
};

// Function to link ENS domain to IPFS content
export const linkENSToCID = async (
  ensName: string,
  cid: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would update the ENS content hash
    console.log(`Linking ENS ${ensName} to CID ${cid}`);
    
    // Simulate ENS content hash update
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  } catch (error) {
    console.error("Error linking ENS to CID:", error);
    return false;
  }
};

// Function to get gas price
export const getGasPrice = async (): Promise<string> => {
  try {
    // In a real implementation, this would use ethers.js provider to get gas price
    console.log("Getting current gas price");
    
    // Simulate gas price fetch
    return "50"; // Gwei
  } catch (error) {
    console.error("Error getting gas price:", error);
    return "0";
  }
};

// Function to sign message with wallet
export const signMessage = async (message: string): Promise<string | null> => {
  try {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      
      // Get the current account
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length === 0) {
        throw new Error("No connected accounts. Please connect your wallet first.");
      }
      
      // Sign the message
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });
      
      return signature;
    } else {
      throw new Error("MetaMask not found. Please install MetaMask to continue.");
    }
  } catch (error) {
    console.error("Error signing message:", error);
    return null;
  }
};