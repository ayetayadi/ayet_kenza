import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-annonceursteams',
  templateUrl: './annonceursteams.component.html',
  styleUrls: ['./annonceursteams.component.css']
})
export class AnnonceursteamsComponent implements OnInit {
  @ViewChild('editBtn', { static: true, read: ElementRef })
  editBtnRef!: ElementRef<HTMLButtonElement>;

  annonceurs: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';
  selectedAnnonceur: any = {};

  annonceurEmail: string = '';

  emailA: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  tel: string = '';
  nomE: string = '';
  emailE: string = '';
  adresseE: string = '';
  domaineE: string = '';

  message: string = '';
  isDetailsDisabled: boolean = true;

  annonceur = {
    username :'',
    email:'',
    tel :'',
    nomE : '',
    emailE : '',
    adresseE : '',
    domaineE : '',
  }; 
  constructor(private http: HttpClient, private elementRef: ElementRef, public shared: SharedService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAnnonceurs().subscribe((data: any[]) => {
      console.log(data);
      this.annonceurs = data;
    }, error => {
      console.log(error);
    });


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }


openModal(annonceur: any) {
  this.isDetailsDisabled = false;

  this.username = annonceur.username;
  this.email = annonceur.email;
  this.tel = annonceur.tel;
  this.nomE = annonceur.nomE;
  this.emailE = annonceur.emailE;
  this.adresseE = annonceur.adresseE;
  this.domaineE = annonceur.domaineE;
}

resetDetails() {
  this.username = '';
  this.email = '';
  this.tel = '';
  this.nomE = '';
  this.emailE = '';
  this.adresseE = '';
  this.domaineE = '';

  this.isDetailsDisabled = true;
}

  showDetails(annonceur: any): void {
    this.username = annonceur.username;
    this.email = annonceur.email;
    this.tel = annonceur.tel;
    this.nomE = annonceur.nomE;
    this.emailE = annonceur.emailE;
    this.adresseE = annonceur.adresseE;
    this.domaineE = annonceur.domaineE;
  }
  

  deleteAnnonceur(email: string) {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'annonceur avec email ${email}?`)) {
      console.log(`Suppression de l'annonceur avec succés`);
      this.accountService.deleteAnnonceur(email).subscribe(
        () => {
          console.log(`Annonceur avec email ${email} supprimé`);
          this.message = `Annonceur avec email ${email} supprimé`;
          this.annonceurs = this.annonceurs.filter(annonceur => annonceur.email !== email);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Get that email from the column of the annonceurs when you click on button Modifier
  getEmail(emailA: string): string {
    console.log(emailA);
    this.emailA = emailA;
    return emailA;
  }

  //Retrieve that email and console it
  useEmail() {
    console.log(this.getEmail(this.emailA));
  }

  editAnnonceur(): void {
    console.log(this.getEmail(this.emailA));
    this.accountService.editAnnonceur(this.getEmail(this.emailA), this.username, this.email, this.tel, this.nomE, this.emailE, this.domaineE, this.adresseE).subscribe(
      () => {
        console.log('Annonceur mis à jour avec succès');
      },
      error => {
        console.log('Erreur lors de la mise à jour:', error);
      }
    );
  }


  createAnnonceur(): void {
    this.accountService.createAnnonceur(this.username, this.email, this.password)
      .subscribe(
        (result) => {alert('Invitation au nouveau annonceur est envoyée avec succès!')
      

      },
        error => console.error(error)
      );
  }


  getPaginatedAnnonceurs() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredAnnonceurs = this.annonceurs;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredAnnonceurs = filteredAnnonceurs.filter(
        annonceur =>
          annonceur.username.toLowerCase().includes(searchTextLower) ||
          annonceur.email.toLowerCase().includes(searchTextLower)
      );
    }
    return filteredAnnonceurs.slice(start, end);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.annonceurs.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.annonceurs.length / this.itemsPerPage);
  }
}