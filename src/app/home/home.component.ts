import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  adminName:string=""
  userCount:number=0
  sidebarStatus:boolean=true
  constructor( private userAPI:ApiService,private router:Router) {}

  //sidebar hide
  menuBtnClicked(){
    this.sidebarStatus=!this.sidebarStatus
  }


  ngOnInit(): void {
    this.getToatalCount()
    if(sessionStorage.getItem("adminDetails")){
      this.adminName=JSON.parse(sessionStorage.getItem("adminDetails") || "").name
    }
  }

  getToatalCount(){
    this.userAPI.getAllUserAPI().subscribe((res:any)=>{
      this.userCount=res.length
      
    })
  }

  adminChange(event:any){
    this.adminName=event
  }


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("")
  }
}
