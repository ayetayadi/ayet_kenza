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
    return this.http.get(`${this.url}getTeams`, { headers: httpOptions.headers, params });
  }

  createTeam(token: string, nom: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/annonceur/createTeam?token=${token}`, { nom });
  }

  deleteTeam(teamName: string, token: string) {
    const url = `http://localhost:3000/annonceur/deleteTeam/${teamName}?token=${token}`;
    return this.http.delete(url);
  }


  updateTeam(teamName: string, newTeamName: string): Observable<any> {
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.url}updateTeam/${teamName}?token=${token}`;
    const data = { nom: newTeamName };
    console.log(this.shared.getAnnonceurToken());
      return this.http.put(url, data, { headers: httpOptions.headers });
  }

 
  sendInvitation(email: string, team: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const data = { email, nom: team};
    console.log(data);
    return this.http.post(`http://localhost:3000/annonceur/inviteMember?token=` + token, data)
  }

  getMembersByTeam(teamName: string): Observable<any> {
    const url = `${this.url}getMembersByTeam/${teamName}`;
    return this.http.get(url);
  }


  acceptInvitation(code: string) : Observable<string>{
    {
      const url = `${this.url}acceptInvitation`;
      const body = { code };
      return this.http.post<string>(url, body);
    }
  }

 
  deleteMember(email: string, team: string): Observable<any>{
    const url = `${this.url}deleteMember`;
    const body = { email: email, nom: team };
    return this.http.delete(url, { body });
  }








}


