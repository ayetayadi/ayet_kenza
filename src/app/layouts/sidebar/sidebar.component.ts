import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: any;
  role: string = '';
  displaySidebar: boolean = true;
  showSidebar: boolean = true;

  constructor( private shared: SharedService, public accountService: AccountService,  private cookieService: CookieService, private router: Router) { 
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

    console.log(this.shared.getMemberToken());
    const tokenObjMember = this.shared.getMemberToken() as unknown as { token: string };
    const memberToken = tokenObjMember.token;
    console.log(memberToken);
    const token = this.shared.getAdminToken() || this.shared.getAnnonceurToken();
    console.log(this.cookieService.get('memberToken'));
    this.accountService.verifyRole(token).subscribe(
      response => {
        this.role = response.role;
    
      
        
      },
      error => {
        console.log(error);
      }
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        if (currentRoute === '/bannières') {
          this.showSidebar = false;
        } else {
          this.showSidebar = true;
        }
      }
    });
  
    }
        
  }



