import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(private fservice:FirebaseserviceService, private router: Router){}
  ngOnInit(): void {
    
    this.fservice.changeLoginStatus ? console.log('user LoggedIn') : this.router.navigateByUrl('login')

    this.fservice.getCompletedvisits().then(visits=>{
      this.completedVisits= visits;
    })
  }

  downloadAsExcel(tableElement: Element){

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head ><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = tableElement;
    const ctx = { worksheet: 'completedVisits', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `visits-completed.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click()
    }
  
  
  searchforVisit(ev:any){
    var searchText= (<HTMLInputElement>document.getElementById('searchInput'))!.value;
    let table= document.getElementById('visitsTable');
    let rows= table?.getElementsByTagName('tr');
    
    for(let i=0; i < rows!.length; i++){
      var tds= rows![i].getElementsByTagName('td');
      
      for (var j = 0; j < tds.length; j++) {
        const element = rows![i].getElementsByTagName('td')[j]
        if(element){
          if (element.innerHTML.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            rows![i].style.display= '';
            break;
          }else{
            rows![i].style.display = "none";
          }
        }
        
      }
    }
  }

  logOut(){
    this.fservice.changeLoginStatus= false;
    this.router.navigateByUrl('login');
  }
}
