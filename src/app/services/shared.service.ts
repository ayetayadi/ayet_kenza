import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private token: string;

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.token = "";
  }
  
  setAdminToken(token: string) {
    this.token = token;
  }

  getAdminToken(): string {
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    return accessToken;
    }


  setAnnonceurToken(token: string) {
    this.token = token;
  }

  getAnnonceurToken(): string {
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    console.log(accessToken);
    return accessToken;
  }

  setMemberToken(token: string) {
    this.token = token;
  }

  getMemberToken(): string {
    const accessMemberToken = this.cookieService.get('accessMemberToken');
   console.log(accessMemberToken);
    return accessMemberToken;
  }
  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    return accessToken;
    }

}

