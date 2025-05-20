import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.css'],
})
export class SubscriberFormComponent {
  subscriberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.subscriberForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPlanId: ['', Validators.required], // You will map this to Plan in backend
    });
  }
  onSubmit() {
    if (this.subscriberForm.invalid) return;

    const subscriberPayload = {
      mobileNumber: this.subscriberForm.value.mobileNumber,
      name: this.subscriberForm.value.name,
      email: this.subscriberForm.value.email,
      currentPlanId: +this.subscriberForm.value.currentPlanId, // ensure it's a number
    };

    this.apiService.addSubscriber(subscriberPayload).subscribe({
      next: (res) => {
        console.log('Subscriber added successfully', res);
        this.subscriberForm.reset();
      },
      error: (err) => {
        console.error('Error adding subscriber', err);
      },
    });
  }
}
