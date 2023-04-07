import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, catchError, finalize, of } from 'rxjs';
import { SharedService } from './shared.service';




@Injectable({
  providedIn: 'root'
})
export class AuthannonceurService {

  isAnnonceur: boolean = false;


  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://127.0.0.1:3000/annonceur/';


  register(annonceur: any) {
    return this.http.post(this.url + 'register', annonceur);
  }


  login(annonceur: any) {
    localStorage.setItem('token', 'your_jwt_token_here');
    return this.http.post(this.url + 'login', annonceur);
  }

  get(id: number) {
    return this.http.get(this.url + `getById/${id}`);
  }

  getAnnonceurs() {
    return this.http.get<any[]>(this.url + 'getAll');
  }


  changePassword(oldPassword: string, newPassword: string, email: string) {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      email: email
    };

    return this.http.post(this.url + 'changePassword', data);
  }


  Profil = {
    username: '',
    email: ''
  }


  saveDataProfil(token: any, username: any, email: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
    this.Profil.username = username;
    this.Profil.email = email;
    // this.isLoggedIn = true
  }

  getFromToken() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…3NTN9.IPx06j-_WZu4wxaI6dUdrMQtAUw7KQfHDydA-5ovgL4';
    if (token) {
      const payload: any = jwt_decode(token);
      console.log(payload);
      const email = payload.email;
      console.log(email);
      return email;
    }
  }


  getByEmail(email: any) {
    return this.http.get(this.url + 'getByEmail/${email}' + email);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);

  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  isAnnonceurLoggedIn() {
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    if (token != null) {
      return true
    }
    return false;
  }


  getAnnonceur() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.get('http://localhost:3000/annonceur/profile', {
      observe: 'body',
      params: new HttpParams().append('token', token)
    })
  }

  updateAnnonceur(id: string, username: string, email: string, tel: string, nomE: string, emailE: string, domaineE: string, adresseE: string) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const body = { id, username, email, tel, nomE, emailE, domaineE, adresseE };
    return this.http.put('http://localhost:3000/annonceur/editProfile?token=' + token, body, httpOptions);

  }


  getAnnonceurFromToken(): boolean {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log('Annonceur Token: ' + token);
    return this.isAnnonceur = true;
  }


  forgotPassword(email: string) {
    return this.http.post(this.url + 'forgotPassword', { email: email });
  }


  resetPassword(passwordResetToken: string, password: string, confirmPassword: string) {
    const body = { password, confirmPassword };
    const url = this.url + `/resetPassword?passwordResetToken=${passwordResetToken}`;
    return this.http.post(url, body);
  }

  /*  createTeam(nom: string) {
      const body = { nom: nom };
      return this.http.post(this.url +'/createTeam', body);
    }
  */

  getTeamsForAnnonceur(id: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.url}teams`, { headers: httpOptions.headers, params });
  }



 



  sendInvitation(email: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const data = { email };
    console.log(data);
    return this.http.post(`http://localhost:3000/annonceur/inviterM?token=` + token, data)
      .pipe(
        catchError(error => {
          console.error('Error sending invitation:', error);
          return of({ error: true, message: 'Error sending invitation' });
        })
      );
  }


  accept(membre: any) {

    return this.http.post(this.url + 'accept', membre);
  }

  createTeam(token: string, nom: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/annonceur/createTeam?token=${token}`, { nom });
  }





  getMembersByTeam(teamName: string) {
    return this.http.get(`http://localhost:3000/annonceur/teamsM/${teamName}/members`);
  }

  deleteMember(teamName: string, memberName: string) {
    const url = `localhost:3000/annonceur//teamsM/${teamName}/members/${memberName}`;
    return this.http.delete(url);
  }








}


