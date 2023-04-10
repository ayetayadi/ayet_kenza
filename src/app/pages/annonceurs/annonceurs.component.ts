import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthadminService } from 'src/app/services/authadmin.service';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
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


  constructor(private http: HttpClient, private elementRef: ElementRef, public shared: SharedService, public auth1: AuthadminService, private auth2: AuthannonceurService) { }

  ngOnInit(): void {
    this.auth1.getAnnonceurs().subscribe((data: any[]) => {
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
      this.auth1.deleteAnnonceur(email).subscribe(
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
    this.http.put(`http://localhost:3000/admin/editAnnonceur/${this.getEmail(this.emailA)}`, {
      username: this.username,
      email: this.email,
      tel: this.tel,
      nomE: this.nomE,
      emailE: this.emailE,
      domaineE: this.domaineE,
      adresseE: this.adresseE
    }).subscribe(
      () => {
        console.log('Annonceur mis à jour avec succès');
      },
      error => {
        console.log('Erreur lors de la mise à jour:', error);
      }
    );
  }



  createAnnonceur(): void {
    this.http.post('http://localhost:3000/admin/addAnnonceur/', { username: this.username, email: this.email, password: this.password })
      .subscribe(
        (result) => alert('Annonceur ajouté avec succès!'),
        error => console.error(error)
      );
  }
}

