import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, FormsModule]
})
export class LoginComponent implements OnInit {
  loginInterfaceForm: FormGroup;

  constructor(private loginForm: FormBuilder, private router: Router){}
  ngOnInit(): void {
    this.loginInterfaceForm= this.loginForm.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  submitLogin(){
    console.log(this.loginInterfaceForm.value);
  }
}
