import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  fallbackUsers = [
    { email: 'adminfake@gmail.com', password: 'admin', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

onLogin() {
  const payload = { email: this.email, password: this.password };

  this.http.post<any>('http://localhost:5019/api/auth/login', payload).subscribe({
    next: (response) => {
      console.log('Logged in from API:', response);

      // Store token for future requests
      localStorage.setItem('token', response.token);

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.warn('Backend not ready or failed, using fallback login...');

      const foundUser = this.fallbackUsers.find(user =>
        user.email === this.email && user.password === this.password
      );

      if (foundUser) {
        console.log(`Login successful (local): Welcome ${foundUser.role}`);

        // Optionally store a fake token or role locally here if needed
        localStorage.setItem('token', 'fake-jwt-token'); // just an example

        this.router.navigate(['/dashboard']);
      } else {
        console.error('Login failed (local): Invalid credentials');
        alert('Invalid credentials');
      }
    }
  });
}
}
