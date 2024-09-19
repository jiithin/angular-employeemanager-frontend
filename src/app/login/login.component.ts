import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""


  constructor(private toaster:ToastrService,private api:AdminService,private router:Router){}


  login(){
    //admin login logic

    if(this.email&&this.password){
      // this.toaster.success("Proceed to api call")
      this.api.getAdminDetails().subscribe({
        next:(res:any)=>{
          console.log(res);
          
          const{email,password}=res
          if(email==this.email&&password==this.password){
            this.toaster.success("Login Successful")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            //navigate
            this.router.navigateByUrl('/dashboard')
          }
        },
        error:(reson:any)=>{
          console.log(reson.message);
          
        }
      })

    }else{
      this.toaster.warning("Please fill the form completely")
    }
  }
}
