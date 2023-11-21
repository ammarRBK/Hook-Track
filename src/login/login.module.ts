import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      BrowserModule,
      LoginRoutingModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
  })
export class LoginModule { }