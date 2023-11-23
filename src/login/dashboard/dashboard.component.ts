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
  trafoItem: any;
  constructor(private fservice:FirebaseserviceService){}
  ngOnInit(): void {
        this.fservice.getCompletedvisits().then(visits=>{
          this.completedVisits= visits;
        })
  }

  downloadAsExcel(tableElement: Element){
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s: any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s: any, c: any) { return s.replace(/{(\w+)}/g, function(m: any, p: any) { return c[p]; }) };

    const table = tableElement;
    const ctx = { worksheet: 'completedVists', table: table.innerHTML };

    const link= document.getElementById('downloadLink');
    link?.setAttribute('download',`completed-vists.xlsx`);
    link?.setAttribute('href',uri + base64(format(template, ctx)));
    link?.click()

  }  
}
