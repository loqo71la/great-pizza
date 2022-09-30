import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'gp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private authService: AuthService, private router: Router) { }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(_ => this.router.navigate(['/']));
  }

  signInWithGithub() {
    this.authService.signInWithGitHub().then(_ => this.router.navigate(['/']));
  }
}
