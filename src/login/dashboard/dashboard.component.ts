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
    // get the login status from service and route the user to the page depending on the status
    this.fservice.changeLoginStatus ? this.router.navigateByUrl('login/dashboard') : this.router.navigateByUrl('login')
    // get the vists from the database
    this.fservice.getCompletedvisits().then(visits=>{
      // assign the vists that came from service to completed vists array
      this.completedVisits= visits;
    })
  }

  downloadAsExcel(tableElement: Element){

    const uri = 'data:application/vnd.ms-excel;base64,';
    // make XML file and add the dashboard table to it
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head ><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = tableElement;
    // set excel sheet name and it’s content
    const ctx = { worksheet: 'completedVisits', table: table.innerHTML };
    // add download property to 'download as excel file' a tag with the Excel File name as property vlaue 
    const link = document.createElement('a');
    link.download = `visits-completed.xls`;
    // create href property and assign to the url with base64 format to so you can download the file when it pressed 
    link.href = uri + base64(format(template, ctx));
    link.click()
    }
  
  
  searchforVisit(ev:any){
    // get the search text from user input 
    var searchText= (<HTMLInputElement>document.getElementById('searchInput'))!.value;
    // get all table rows
    let table= document.getElementById('visitsTable');
    let rows= table?.getElementsByTagName('tr');
    // loop over the table rows to get children cells inside the row
    for(let i=0; i < rows!.length; i++){
      var tds= rows![i].getElementsByTagName('td');
      //loop over the row cells
      for (var j = 0; j < tds.length; j++) {
        const element = rows![i].getElementsByTagName('td')[j]
        if(element){
          //check if the text content of the cell is equal to text serach input 
          //if yes show the whole row
          //if not hide the whole row 
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
    //change login status to not logged in and route the user to Login page
    this.fservice.changeLoginStatus= false;
    this.router.navigateByUrl('login');
  }
}
