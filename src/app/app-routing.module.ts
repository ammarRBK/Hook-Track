import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // loadChildren: ()=> import('../login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
