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
    //get user email and password inputs
    let email= this.loginInterfaceForm.value.email;
    let password= this.loginInterfaceForm.value.password;
    //get a query result from the auth service 
    this.fservice.getUsers(email).then(querySnapshot=>{
      //check if query has a result or not
      //if it has continue to authinticate the user
      //either the user is not in the database so show the error message
      if(querySnapshot.size > 0){
        querySnapshot.forEach(user=>{
          if(user.exists()){
            if(user.data()['Password'] == password){
              console.log("Log in the User")
              this.fservice.changeLoginStatus= true;
              this.router.navigateByUrl('login/dashboard');
            }else{
              this.errorMessage= 'Wrong Password please check Again';
              //hide error message after 5 seconds
              setTimeout(() => {
                this.errorMessage='';
              }, 5000);
            }
          }
        })
      }else{
        this.errorMessage= 'Invalid Email or User not SignedUp please check again';
        setTimeout(() => {
          this.errorMessage='';
        }, 5000);
      }
      
        
    })   
  }
}
