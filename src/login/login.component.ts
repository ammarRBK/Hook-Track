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

    this.fservice.getUsers(email).then(querySnapshot=>{
      if(querySnapshot.size > 0){
        querySnapshot.forEach(user=>{
          if(user.exists()){
            if(user.data()['Password'] == password){
              console.log("Log in the User")
              this.router.navigateByUrl('login/dashboard');
            }else{
              this.errorMessage= 'Wrong Password please check Again';
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

    // this.fservice.getUsers(email)
    // .then(querySnapshot=>{
    //   querySnapshot.forEach(user=>{
    //     if(user){
    //       if(user.data()['Email'] == email){
    //         if(user.data()['Password'] == password){
    //           console.log("Signed in Successfully")
    //         }
    //       }
    //     }else{
    //       this.errorMessage= 'Invalid Email or Password please check again';
    //       setTimeout(() => {
    //         this.errorMessage= '';
    //       }, 5000);
    //     }
    //   })
    // }).catch(err=>{
    //   this.errorMessage= err;
    // })
      
  }
}
