import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private shared: SharedService) { }
 
  private url = 'http://localhost:3000/'
  private urlAnnonceur = 'http://127.0.0.1:3000/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3000/admin/';
  private urlMembre = 'http://127.0.0.1:3000/membre/';


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
    return this.http.get(`${this.urlAnnonceur}getTeams`, { headers: httpOptions.headers, params });
  }

  createTeam(token: string, nom: string): Observable<any> {
    return this.http.post<any>(`${this.urlAnnonceur}createTeam?token=${token}`, { nom });
  }

  deleteTeam(teamName: string, token: string) {
    const url = `${this.urlAnnonceur}deleteTeam/${teamName}?token=${token}`;
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
    const url = `${this.urlAnnonceur}updateTeam/${teamName}?token=${token}`;
    const data = { nom: newTeamName };
    console.log(this.shared.getAnnonceurToken());
    return this.http.put(url, data, { headers: httpOptions.headers });
  }


  sendInvitation(email: string, team: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const data = { email, nom: team };
    console.log(data);
    return this.http.post(`${this.urlAnnonceur}inviteMember?token=` + token, data)
  }

  getMembersByTeam(teamName: string): Observable<any> {
    const url = `${this.urlAnnonceur}getMembersByTeam/${teamName}`;
    return this.http.get(url);
  }

  deleteMember(email: string, team: string): Observable<any> {
    const url = `${this.urlAnnonceur}deleteMember`;
    const body = { email: email, nom: team };
    return this.http.delete(url, { body });
  }

  acceptInvitation(code: string) : Observable<string>{
    {
      const url = `${this.urlMembre}acceptInvitation`;
      const body = { code };
      return this.http.post<string>(url, body);
    }
  }
}
