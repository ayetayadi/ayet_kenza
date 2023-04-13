import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthMembreService {

  constructor(private http: HttpClient) { }

  private url = 'http://127.0.0.1:3000/membre/';

  acceptInvitation(code: string) : Observable<string>{
    {
      const url = `${this.url}acceptInvitation`;
      const body = { code };
      return this.http.post<string>(url, body);
    }
  }
}
