import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dummy-payment',
  templateUrl: './dummy-payment.component.html',
  styleUrls: ['./dummy-payment.component.css'],
})
export class DummyPaymentComponent implements OnInit {
  paymentDetails: any = {};
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  transactionId: string = '';
  transactionTime: string = '';
  countdown: number = 3;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get payment details from route state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.paymentDetails = navigation.extras.state;
    } else {
      this.router.navigate(['/recharge']);
    }
  }

  confirmPayment(): void {
    this.loading = true;

    // Simulate payment processing
    setTimeout(() => {
      this.loading = false;
      this.transactionId = 'TXN' + Math.floor(Math.random() * 1000000000);
      this.transactionTime = new Date().toLocaleString();
      this.successMessage = 'Payment successful!';

      // Start countdown
      this.startCountdown();
    }, 1500);
  }

  startCountdown(): void {
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(timer);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  cancelPayment(): void {
    this.router.navigate(['/recharge']);
  }
}
