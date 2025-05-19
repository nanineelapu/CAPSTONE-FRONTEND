import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Check if user was redirected from registration
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Registration successful! Please login.';
      }
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.apiService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        // Store token and redirect to mobile validation
        this.apiService.storeUserToken(response.token);
        this.router.navigate(['/validate-mobile'], {
          queryParams: { mobileNumber: response.mobileNumber },
        });
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error || 'Login failed. Please check your credentials.';
      },
    });
  }
}
