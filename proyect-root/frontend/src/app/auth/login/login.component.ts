import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCardModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  this.http.post<any>('http://localhost:3000/api/users/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token); // Guarda JWT
      this.router.navigate(['/dashboard']); // Redirige al dashboard
    },
    error: (err) => {               
      console.error(err);
      this.errorMessage = err.error?.error || 'Error al iniciar sesión';
      this.password = '';           // Limpia el campo contraseña
    }
  });
}
}