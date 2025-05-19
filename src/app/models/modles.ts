export interface User {
  id: number;
  mobileNumber: string;
  email: string;
  password?: string; // Optional as you typically don't return password
}

export interface Admin {
  id: number;
  username: string;
  password: string;
}

export interface Plan {
  id: number;
  name: string;
  category: string;
  price: number;
  dataPerDay: string;
  calls: string;
  sms: string;
  validityDays: number;
}

export interface Recharge {
  id: number;
  mobileNumber: string;
  plan: Plan;
  amount: number;
  paymentMethod: string;
  rechargeDate: string;
  status: string;
}

export interface Subscriber {
  id: number;
  mobileNumber: string;
  name: string;
  email: string;
  currentPlan: Plan;
  planExpiry: string;
  dataUsed: number;
  dataTotal: number;
  createdAt: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface MobileValidationRequest {
  mobileNumber: string;
}

export interface RechargeRequest {
  mobileNumber: string;
  planId: number;
  paymentMethod: string;
  paymentDetails?: string;
}

export interface RechargeResponse {
  transactionId: string;
}
export interface UserLoginResponse {
  token: string;
  mobileNumber: string;
}
export interface UserLoginRequest {
  mobileNumber: string; // Changed from Long to string for frontend use
  password: string;
}
export interface UserRegistrationRequest {
  mobileNumber: string;
  email: string;
  password: string;
}
