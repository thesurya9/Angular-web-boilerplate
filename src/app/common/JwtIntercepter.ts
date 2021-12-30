import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
// import { AuthserviceService } from "../authservice.service";
import { Router } from '@angular/router';
import { CommonService } from './commonService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  userDetail:any;

  constructor( private _router: Router,
    private common : CommonService) { 
      this.userDetail = this.common.getLoggedInUser();
    }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('alertrak-auth-token')
    const modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Basic ${token}`,
        api_key:'bq2SNgjc74w6VAXsjIS4XpBCuMrBYtHFsstTw6C1',
        // 'content-type': 'application/json'
        platform : 'web',
      }
    });
    return next.handle(modifiedReq).pipe(map((event) => {
      return event;
    }), 
    catchError((err) => {
      if (err.status === 401) {
        localStorage.clear();
        this._router.navigate(['/login'])
        return throwError(err);
      }
      else
        return throwError(err);


    }), finalize(() => {
      // this._commonService.hideLoading();
    }))
  }

}


