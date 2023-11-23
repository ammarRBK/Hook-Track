import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getFirestore, collection, query, where, getDoc, getDocs } from"firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {
  // web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyDuIS3Xp1cH_QfEOBB3bmO4AnCDOeZfbaw",
    authDomain: "seller-e5d9e.firebaseapp.com",
    databaseURL: "https://seller-e5d9e-default-rtdb.firebaseio.com",
    projectId: "seller-e5d9e",
    storageBucket: "seller-e5d9e.appspot.com",
    messagingSenderId: "334595696604",
    appId: "1:334595696604:web:d95f3a110c7fad420f1119",
    measurementId: "G-ESHBR52JXP"
  };
  
  // Initialize Firebase
  app= firebase.initializeApp(this.firebaseConfig)
  // Initialize Cloud Firestore and get a reference to the service
  db= getFirestore(this.app);
  
  constructor() { }

  async getUsers(email:string){
    const user= query(collection(this.db, "dashboard_users"), where("Email", "==", email))
    return await getDocs(user);
  }

  async getCompletedvisits(){
    let completed_visits:any=[];
    const Query= query(collection(this.db, "usersV2"))
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach(async (user)=> {
      const myquery= query(collection(this.db, "completed visits"), where('userId', '==', user.data()['id']))
      const visitsQuerySnapshots= await getDocs(myquery);

      if(visitsQuerySnapshots.size > 0){
        visitsQuerySnapshots.forEach(visit=>{
          let fullVisit= visit.data();

          completed_visits.push({
            address: fullVisit['address'],
            classy: fullVisit['classy'],
            completedDate: fullVisit['completedDate'],
            dateOfNextVisit: fullVisit['dateOfNextVisit'],
            dateOfVisit: fullVisit['dateOfVisit'],
            dist: fullVisit['dist'],
            governorate: fullVisit['governorate'],
            image: fullVisit['image'],
            isMocking: fullVisit['isMocking'],
            line: fullVisit['line'],
            name: fullVisit['name'],
            note: fullVisit['note'],
            phone: fullVisit['phone'],
            planed: fullVisit['planed'],
            searchName: fullVisit['searchName'],
            specialty: fullVisit['specialty'],
            status: fullVisit['status'],
            time: fullVisit['time'],
            type: fullVisit['type'],
            username: user.data()['username'],
            visitId: fullVisit['visitId'],
            group: user.data()['group'],
            subgroup: user.data()['subgroup']
          })
        })
      }
      
      // let userNmae= user.data()['username'];
      // let id= user.data()['id'];
      // users.push({username: userNmae, id: id})
    })
    return completed_visits;
  }
}
