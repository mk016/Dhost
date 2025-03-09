// User types
export interface User {
  id: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Deployment types
export interface Deployment {
  id: string;
  userId: string;
  name: string;
  description?: string;
  domain?: string;
  subdomain?: string;
  ipfsHash?: string;
  arweaveId?: string;
  status: 'building' | 'active' | 'failed';
  storageType: 'ipfs' | 'arweave';
  permanent: boolean;
  size?: string;
  createdAt: string;
  updatedAt: string;
}

// Domain types
export interface Domain {
  id: string;
  userId: string;
  deploymentId?: string;
  name: string;
  type: 'ens' | 'unstoppable' | 'traditional' | 'subdomain';
  status: 'active' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Analytics types
export interface AnalyticsData {
  deploymentId: string;
  views: number;
  uniqueVisitors: number;
  bandwidth: number;
  period: 'day' | 'week' | 'month';
  data: {
    date: string;
    views: number;
    uniqueVisitors: number;
    bandwidth: number;
  }[];
}

// Storage types
export interface StorageUsage {
  userId: string;
  totalSize: number;
  ipfsSize: number;
  arweaveSize: number;
  limit: number;
  updatedAt: string;
}

// Plan types
export interface Plan {
  id: string;
  name: string;
  price: number;
  storageLimit: number;
  bandwidthLimit: number;
  deploymentLimit: number;
  features: string[];
}