import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthannonceurInterceptor } from '../../interceptors/authannonceur.interceptor';
import { AuthadminInterceptor } from '../../interceptors/authadmin.interceptor';
import { concatMap, delay } from 'rxjs';
import { AuthmembreInterceptor } from 'src/app/interceptors/authmembre.interceptor';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string = '';

  username: string = '';


  isAdminLoggedIn: boolean = false;
  isAnnonceurLoggedIn: boolean = false;
  isMembreLoggedIn: boolean = false;
  cookieService: any;

  constructor(@Inject(DOCUMENT) private document: Document, public authService: AuthService, public accountService: AccountService, private router: Router, private shared: SharedService) {
    this.accountService.getAnnonceur().subscribe(
      (response: any) => {
        console.log(response)
        this.username = response.username;
        console.log(this.username)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

    console.log(this.shared.getAdminToken());
    const tokenObjAdmin = this.shared.getAdminToken() as unknown as { token: string };
    const adminToken = tokenObjAdmin.token;
    console.log(adminToken);

    console.log(this.shared.getAnnonceurToken());
    const tokenObjAnnonceur = this.shared.getAnnonceurToken() as unknown as { token: string };
    const annonceurToken = tokenObjAnnonceur.token;
    console.log(annonceurToken);


    const token = this.shared.getAdminToken() || this.shared.getAnnonceurToken() ;
    this.accountService.verifyRole(token).subscribe(
      response => {
        this.role = response.role;
        console.log(this.role);
      },
      error => {
        console.log(error);
      }
    );

  }
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    this.authService.logoutAdmin().pipe(
      delay(1000),
      concatMap(() => {
        AuthadminInterceptor.accessToken = '';
        this.isAdminLoggedIn = false;
        return this.authService.logoutAnnonceur();
      })
    ).subscribe(
      () => {
        AuthannonceurInterceptor.accessToken = '';
        this.isAnnonceurLoggedIn = false;
        this.checkLoginStatus();
        this.router.navigate(['/login'], { skipLocationChange: true, replaceUrl: true });
      },
      () => {
        if (this.cookieService.get('memberToken')) {
          this.authService.logoutMember();
          AuthmembreInterceptor.membreToken = '';
          this.isMembreLoggedIn = false;
          this.checkLoginStatus();
          this.router.navigate(['/invitation'], { skipLocationChange: true, replaceUrl: true });
        }
      }
    );
  }
  
  checkLoginStatus() {
    alert('Logout successful!');
  }
  

  

}
