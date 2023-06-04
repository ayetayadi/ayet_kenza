import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3005/bannerService/'
  private urlAnnonceur = 'http://127.0.0.1:3005/bannerService/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3005/bannerService/admin/';

  getAllBannersByCampagne(campagne: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const url = `${this.urlAnnonceur}getAllBannersByCampagne/${campagne}?token=`+this.shared.getAnnonceurToken();
    return this.http.get(url);
  }

  
  getAllBannersByAnnonceur(): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const url = `${this.urlAnnonceur}getAllBannersByAnnonceur?token=`+this.shared.getAnnonceurToken();
    return this.http.get(url);
  }

  getAllBannersAuthorisationsByAnnonceur(nom: string, email: string): Observable<any> {
    const url = `${this.urlAdmin}getAllBannersAuthorisationsByAnnonceur/${nom}/${email}`;
    return this.http.get(url);
  }


  authoriserBanner(nom: string, isAuthorized: boolean) {
    console.log(this.shared.getAdminToken());
    const tokenObj = this.shared.getAdminToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const url = `${this.urlAdmin}authoriserBanner/${nom}?token=`+this.shared.getAdminToken();
    const body = { isAuthorized };
    return this.http.post(url, body);
  }

  // Get the number of banners of each campagne publicitaire
  getNumberOfBanners(nomCampagne: string): Observable<number> {
    return this.getAllBannersByCampagne(nomCampagne).pipe(
      map((banners: string | any[]) => banners.length)
    );
  }

  getBannerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlAnnonceur}getBannerById/${id}`);
  }

  createBannerWithImageUpload(nom_campagne: string, banner: any): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    console.log(banner);
    console.log(nom_campagne);
    return this.http.post(`${this.urlAnnonceur}createBannerWithImageUpload/${nom_campagne}?token=`+this.shared.getAnnonceurToken(), banner);
  }

  createBannerWithEditor(nom_campagne: string, banner: any): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    console.log(banner);
    console.log(nom_campagne);
    return this.http.post(`${this.urlAnnonceur}createBannerWithEditor/${nom_campagne}?token=`+this.shared.getAnnonceurToken(), banner);
  }

  deleteBanner(nom_campagne: string, nom: string): Observable<any> {
    return this.http.delete<any>(`${this.urlAnnonceur}deleteBanner/${nom_campagne}/${nom}?token=`+this.shared.getAnnonceurToken());
  }

  /*deleteBanner(nom_campagne: string, nom: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.baseUrl}/${nom_campagne}/${nom}`;
    return this.http.delete(url, httpOptions);
  }*/

  getRapportByBanner(nom_campagne: string, nom_banner: string) {
    const url = `${this.urlAnnonceur}getRapportByBanner/${nom_campagne}/${nom_banner}`; 
    return this.http.get(url);
  }
}
