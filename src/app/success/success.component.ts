import { Component } from '@angular/core';
import { Recharge } from '../models/modles';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  recharge?: Recharge;
  countdown = 10;
  timer: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const rechargeId = +idParam;
      this.apiService.getRechargeById(rechargeId).subscribe({
        next: (data) => {
          this.recharge = data;
        },
        error: (err) => {
          console.error('Failed to load recharge data', err);
        },
      });
      this.startCountdown();
    } else {
      // No ID param, maybe redirect or show error
      this.router.navigate(['/recharge']);
    }
  }

  startCountdown(): void {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
        this.router.navigate(['/recharge']);
      }
    }, 1000);
  }

  goHome(): void {
    clearInterval(this.timer);
    this.router.navigate(['']);
  }
}
