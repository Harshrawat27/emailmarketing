// Waitlist user type
export interface WaitlistUser {
  _id: string;
  email: string;
  signupDate: Date;
  source: string;
  referralCount: number;
  username: string;
  firstName?: string;
}

// Email template type
export interface EmailTemplate {
  _id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

// Table pagination params
export interface PaginationParams {
  page: number;
  limit: number;
  hasMore: boolean;
  total: number;
}

// Waitlist stats
export interface WaitlistStats {
  totalUsers: number;
  lastWeekUsers: number;
  topSources: Array<{
    _id: string;
    count: number;
  }>;
}

// Search params for server components
export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

// Params for dynamic routes
export interface Params {
  id: string;
}
