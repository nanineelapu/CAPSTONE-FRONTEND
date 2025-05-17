import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  transactionId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.transactionId = params['transactionId'];
    });
  }
}
