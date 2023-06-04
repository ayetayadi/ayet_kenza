import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PaiementService } from 'src/app/services/paiement.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  annonceur = {
    email: '',
    oldPassword: '',
    newPassword: ''
  }

  factures: any[] = [];

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  updated = {
    username: '',
    email: '',
    dateNaiss: '',
    tel: '',
    nomE: '',
    emailE: '',
    telE: '',
    domaineE: '',
    adresseE: ''
  }

  profile: any = {};

  id: string = '';
  username: string = '';
  email: string = '';
  dateNaiss: string = '';
  tel: string = '';
  nomE: string = '';
  emailE: string = '';
  telE: string = '';
  domaineE: string = '';
  adresseE: string = '';

  errorMessage: string = '';

  constructor(private accountService: AccountService, private router: Router, private paiementService: PaiementService) {

    this.accountService.getAnnonceur().subscribe(
      (response: any) => {
        console.log(response)
        this.id = response.id;
        console.log(this.id)
        this.username = response.username;
        console.log(this.username)
        this.email = response.email;
        console.log(this.email)
        this.dateNaiss = response.dateNaiss;
        console.log(this.dateNaiss)
        this.tel = response.tel;
        console.log(this.tel)
        this.nomE = response.nomE;
        console.log(this.nomE)
        this.emailE = response.emailE;
        console.log(this.emailE)
        this.telE = response.telE;
        console.log(this.telE)
        this.domaineE = response.domaineE;
        console.log(this.domaineE)
        this.adresseE = response.adresseE;
        console.log(this.adresseE)

      },
      (error: any) => {
        console.log(error);
        this.router.navigate(['/']);
      }
    );
  }


  loadFactures() {
    this.paiementService.voirFactures().subscribe((factures: any[]) => {
      console.log(factures);
      this.factures = factures;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.loadFactures();
  }


  updateProfile() {
    this.accountService.updateAnnonceur(this.id, this.username, this.email, this.dateNaiss, this.tel, this.nomE, this.emailE, this.telE, this.domaineE, this.adresseE)
      .subscribe(
        () => {
          console.log(`Username of the annonceur: ${this.username}`);
          alert('Le profil est mis à jour avec succés!');
        },
        err => {
          this.errorMessage = err.message || 'An error occurred while updating your profile.';
        }
      );
  }
  

  formatTotalValue(total: number): string {
    if (isNaN(total) || total === null || total === undefined) {
      return '';
    }
    const formattedTotal = total.toFixed(2);

    return formattedTotal;
  }

}



