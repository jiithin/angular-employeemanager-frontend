import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = () => {
  const authStatus=inject(AdminService)
  const toastr =inject(ToastrService)
  const router=inject(Router)

  if(authStatus.isLoggedIn()){
    return true;
  }else{
    toastr.warning("Somthing went wrong")
    router.navigateByUrl("")
    return false;

  }


};
