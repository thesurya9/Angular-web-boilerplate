import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable({
    providedIn: 'root',
})

export class CommonService {
    userDetail:any;
    //public loginUser = localStorage.getItem('loginUser');
    public config = {};
    public userData: any = {};
    public loading: any;

    constructor(
        public http: HttpClient,
        private _toastr: ToastrService,
        public router: Router,
        public spinner: NgxSpinnerService
    ) { 
      this.userDetail = this.getLoggedInUser();
    }

    // getToken() {
    //     return localStorage.getItem('admintoken');
    //   }

    private prepareHeader(headers: HttpHeaders | null): object {
        headers = headers || new HttpHeaders();
        // headers = headers.set('authorization', "Barer "+this.userDetail.token);
        // headers = headers.set('api_key', "bq2SNgjc74w6VAXsjIS4XpBCuMrBYtHFsstTw6C1");
        return {
            headers: headers
        }
    }

    get<T>(url: string, headers?: any ): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.get<T>(url, expandedHeaders)
    }

    post(url: string, body: any, headers?:any): Observable<any> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.post(url, body, expandedHeaders);
    }

    put(url: string, body: any, headers?:any): Observable<any> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.put(url, body, expandedHeaders);
    }

    delete(url: string, body?: any): Observable<any> {
        // const expandedHeaders = this.prepareHeader(headers);
        return this.http.delete(url, body);
    }

    public toastErrorMsg( message: any) {
        this._toastr.error( message);
    }

    public toastWarningMsg(title: any, message: any) {
        this._toastr.warning(title, message);
    }

    public toastSuccessMsg(message: any) {
        this._toastr.success('',message);
    }

    // show loader 
    public showLoading() {
        this.spinner.show();
    }

    //Hide loader
    public hideLoading() {
        setTimeout(() => {
            /// spinner ends after 5 seconds 
            this.spinner.hide();
        }, 100);
    }

    getLoggedInUserId() {
        if (localStorage.getItem('user'))
            return JSON.parse(localStorage.getItem('user') || "{}").Id;
        return null;
    }

    getLoggedInUser() {
        if (localStorage.getItem('userDetail'))
            return JSON.parse(localStorage.getItem('userDetail') || '{}');
        return null;
    }
}

