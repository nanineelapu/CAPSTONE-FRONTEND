import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminLoginRequest, MobileValidationRequest, RechargeRequest, RechargeResponse, Plan, Subscriber, Recharge } from './models/modles';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8080/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    console.log('Stored token:', token); // Debug log
  }

  private getToken(): string | null {
    return this.token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log('Sending Authorization header:', headers.get('Authorization')); // Debug log
    } else {
      console.warn('No token available for request');
    }
    return headers;
  }

  adminLogin(request: AdminLoginRequest): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/admin/login`, request)
      .pipe(
        map(response => {
          if (!response.token) {
            throw new Error('No token received from server');
          }
          console.log('Login response token:', response.token); // Debug log
          return response.token; // Return raw token string
        }),
        catchError(this.handleError)
      );
  }

  validateMobile(request: MobileValidationRequest): Observable<Subscriber> {
    return this.http.post<Subscriber>(`${this.apiUrl}/auth/validate-mobile`, request)
      .pipe(catchError(this.handleError));
  }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiUrl}/user/plans`)
      .pipe(catchError(this.handleError));
  }

 recharge(request: RechargeRequest): Observable<RechargeResponse> {
    return this.http.post<RechargeResponse>(`${this.apiUrl}/user/recharge`, request, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  getExpiringSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.apiUrl}/admin/subscribers/expiring`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getRechargeHistory(mobileNumber: string): Observable<Recharge[]> {
    return this.http.get<Recharge[]>(`${this.apiUrl}/admin/subscribers/${mobileNumber}/history`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }
    console.error('API error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
