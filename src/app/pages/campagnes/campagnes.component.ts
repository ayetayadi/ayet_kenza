import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { CampagneService } from 'src/app/services/campagne.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campgnes',
  templateUrl: './campagnes.component.html',
  styleUrls: ['./campagnes.component.css']
})
export class CampagnesComponent implements OnInit {
  @ViewChild('editBtn', { static: true, read: ElementRef })
  editBtnRef!: ElementRef<HTMLButtonElement>;


  
  campagnes: any[] = [];

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  nomA: string = '';
  nom: string = '';
  nomCampagne: string = '';
  description: string = '';
  date: string = '';

  numberOfBanners: any;

  campagne = {
    nom: '',
    description: ''
  };
  
  constructor(private elementRef: ElementRef, public shared: SharedService, private campagneService: CampagneService, private router: Router) {
    
   }

  
  ngOnInit(): void {

    this.campagneService.getAllCampagnes().subscribe((data: any[]) => {
      console.log(data);
      this.campagnes = data;
    }, error => {
      console.log(error);
    });

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  getNomCampagne(nomA: string): string {
    console.log(this.nomA);
    this.nomA = nomA;
    return nomA;
  }

  useNomCampagne() {
    console.log(this.getNomCampagne(this.nomA));
  }


  updateCampagne(event: Event): void {
    event.preventDefault(); // prevent default form submission behavior

    console.log(this.getNomCampagne(this.nomA));
    this.campagneService.updateCampagne(this.campagnes[0].nomA, this.campagnes[0].nom, this.campagnes[0].description).subscribe(
      response => {
        this.campagneService.getAllCampagnes().subscribe((data: any[]) => {
          console.log(data);
          this.campagnes = data;
        }, error => {
          console.log(error);
        });
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }



  deleteCampagne(nom: string) {
    console.log(this.nom);
    this.campagneService.deleteCampagne(nom).subscribe(
      res => {
      console.log(res)
      const index = this.campagnes.findIndex(campagne => campagne.nom === nom);
      this.campagnes.splice(index, 1);
    },
      err => {
        console.error(err);
      });
  }



  createCampagne(campagne: any) {
    this.campagneService.createCampagne(campagne)
      .subscribe(
        response => {
          console.log(response);
          // display success message to user
        },
        error => {
          console.log(error);
          // display error message to user
        }
      );
  }

  getPaginatedCampagnes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredCampagnes = this.campagnes;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredCampagnes = filteredCampagnes.filter(
        campagnes =>
          campagnes.nom.toLowerCase().includes(searchTextLower) ||
          campagnes.description.toLowerCase().includes(searchTextLower)
      );
    }
    return filteredCampagnes.slice(start, end);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.campagnes.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.campagnes.length / this.itemsPerPage);
  }

}

