import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  adminName:string=""
  @Output() onAdminChange=new EventEmitter()
  adminDetails:any={}
  editAdminStatus:boolean=false
  profilePicture:string="https://cdn-icons-png.flaticon.com/512/7968/7968657.png"

  constructor(private adminAPI:AdminService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails=res
      if(res.profilePic){
        this.profilePicture=res.profilePic
        this.adminName=JSON.parse(sessionStorage.getItem("adminDetails") || "").name
      }
    })
  }

  editBtn(){
    this.editAdminStatus=true
  }

  onCancel(){
    this.editAdminStatus=false
  }

  getFile(event:any){
    let file=event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result)
      this.profilePicture=event.target.result
      this.adminDetails.profilePic=event.target.result
    }
  }

  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toastr.success("Admin Details Updated")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        this.toastr.warning("Can't Update....")
        
      }
    })
  }


}
