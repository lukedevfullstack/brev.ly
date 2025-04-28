export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  lastVisited: string | null;
}

export interface LinkWithStatus extends Link {
  isDeleting?: boolean;
  isUpdating?: boolean;
}