import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3000/'
  private urlAnnonceur = 'http://127.0.0.1:3000/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3000/admin/';

  getAllBannersByCampagne(campagne: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const url = `${this.urlAnnonceur}getAllBannersByCampagne/${campagne}?token=` + token;
    return this.http.get(url);
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

  createBannerWithImageUpload(formData: FormData) {
    return this.http.post(`${this.urlAnnonceur}/createBannerWithImageUpload`, formData);
  }
}
