import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private token: string;

  constructor(private http: HttpClient) { 
    this.token = "";
  }

  setAdminToken(token: string) {
    this.token = token;
  }

  getAdminToken(): string {
    return this.token;
  }


  setAnnonceurToken(token: string) {
    this.token = token;
  }

  getAnnonceurToken(): string {
    return this.token;
  }


  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`http://localhost:3000/verifyRole?token=${token}`);
  }

}

