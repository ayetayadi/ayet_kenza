import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthadminService } from 'src/app/services/authadmin.service';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: string = '';
  constructor( private shared: SharedService) { 
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
  }



