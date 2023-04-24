import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-annonceurs',
  templateUrl: './annonceurs.component.html',
  styleUrls: ['./annonceurs.component.css']
})
export class AnnonceursComponent implements OnInit {
  @ViewChild('editBtn', { static: true, read: ElementRef })
  editBtnRef!: ElementRef<HTMLButtonElement>;

  annonceurs: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

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


  constructor(private http: HttpClient, private elementRef: ElementRef, public shared: SharedService, public account: AccountService) { }

  ngOnInit(): void {
    this.account.getAnnonceurs().subscribe((data: any[]) => {
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

  deleteAnnonceur(email: string) {
    if (window.confirm(`Are you sure you want to delete this annonceur with email ${email}?`)) {
      console.log("Deleting annonceur with email:", email);
      this.account.deleteAnnonceur(email).subscribe(
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
    this.account.editAnnonceur(this.getEmail(this.emailA), this.username, this.email, this.tel, this.nomE, this.emailE, this.domaineE, this.adresseE).subscribe(
      () => {
        console.log('Annonceur mis à jour avec succès');
      },
      error => {
        console.log('Erreur lors de la mise à jour:', error);
      }
    );
  }


  createAnnonceur(): void {
    this.account.createAnnonceur(this.username, this.email, this.password)
      .subscribe(
        (result) => alert('Annonceur ajouté avec succès!'),
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

