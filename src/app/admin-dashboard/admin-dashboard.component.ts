import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Recharge, Subscriber } from '../models/modles';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  historyForm: FormGroup;
  expiringSubscribers: Subscriber[] = [];
  rechargeHistory: Recharge[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.historyForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.apiService.getExpiringSubscribers().subscribe({
      next: (subscribers) => {
        this.expiringSubscribers = subscribers;
        this.errorMessage = null; // Clear error on success
      },
      error: (err) => {
        this.errorMessage = 'Failed to load expiring subscribers. Please try again.';
        console.error('Error fetching expiring subscribers:', err);
      }
    });
  }

  onHistorySubmit(): void {
    if (this.historyForm.valid) {
      const mobileNumber = this.historyForm.value.mobileNumber;
      this.apiService.getRechargeHistory(mobileNumber).subscribe({
        next: (history) => {
          this.rechargeHistory = history;
          this.errorMessage = null; // Clear error on success
        },
        error: (err) => {
          this.errorMessage = 'Failed to load recharge history. Please check the mobile number and try again.';
          console.error('Error fetching recharge history:', err);
        }
      });
    }
  }
}
