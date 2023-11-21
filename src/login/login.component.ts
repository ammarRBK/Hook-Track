import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseserviceService } from 'src/services/firebaseservice.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, FormsModule]
})
export class LoginComponent implements OnInit {
  loginInterfaceForm: FormGroup;
  errorMessage: String;

  constructor(private loginForm: FormBuilder, private router: Router, private fservice:FirebaseserviceService){}
  ngOnInit(): void {
    this.loginInterfaceForm= this.loginForm.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',[Validators.required]]
    })
    
  }

  submitLogin(){
    let email= this.loginInterfaceForm.value.email;
    let password= this.loginInterfaceForm.value.password;

    this.fservice.getUsers().then(users=>{
      users.forEach(user=>{
        if(user.data()['Email'] == email){
          if(user.data()['Password'] == password){
            console.log('Signed in Successfully');
            // this.router.navigateByUrl('')
          }else{
            this.errorMessage= 'Password wrong please provide the Ceorrect password';
          }
        }else{
          this.errorMessage= 'Email wrong please Signup with this Email then return to this page and Login';
        }
      })
    }).catch(err=>{
      console.log(err);
    })
  }
}
