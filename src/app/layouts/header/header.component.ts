import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
import { Router } from '@angular/router';
import { AuthadminService } from 'src/app/services/authadmin.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  role: string = '';
    
  username: string = '';

  constructor(@Inject(DOCUMENT) private document: Document, public auth2: AuthannonceurService, private router: Router,  private auth1: AuthadminService, private shared: SharedService) { 
    this.auth2.getAnnonceur().subscribe(
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


    const token = adminToken || annonceurToken; // get the token from somewhere
    this.shared.verifyToken(token).subscribe(
      response => {
        this.role = response.role;
      },
      error => {
        console.log(error);
      }
    );

  }
  sidebarToggle()
  {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(){
    localStorage.removeItem('token');
    alert("Vous etes déconnecté(e)");
    this.router.navigate(['/login']);
  }
}
