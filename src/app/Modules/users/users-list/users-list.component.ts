import { Component, OnInit } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
   
  p: number = 1;
  searchKey:string=""
  allusers:userSchema[]=[]

  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllUserList()
  }

  getAllUserList(){
    this.api.getAllUserAPI().subscribe({
      next:(result:any)=>{
        
        this.allusers=result
         console.log(this.allusers);
                 
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  
  deleteUser(id:any){
    this.api.removeUserAPI(id).subscribe(
      (res:any)=>{
       this.toastr.success("User removed")
       this.getAllUserList()
      }
    )
  }



  generatePDF(){
    let pdf = new jspdf()
    let head=[["EmpId","Username","Email","Status"]]
    let body:any=[]
    this.allusers.forEach((item:any)=>{
      if(item.id!==1){
      body.push([item.empId,item.username,item.email,item.status])
      }
    })
    pdf.setFontSize(16)
    pdf.text("Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }


  sortById(){
    this.allusers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.empId))
}


  sortByName(){
    this.allusers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
}


}