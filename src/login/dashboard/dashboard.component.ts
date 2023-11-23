import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseserviceService } from 'src/services/firebaseservice.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  completedVisits: any;
  constructor(private fservice:FirebaseserviceService){}
  ngOnInit(): void {
        this.fservice.getCompletedvisits().then(visits=>{
          this.completedVisits= visits;
        })
  }

  
}
