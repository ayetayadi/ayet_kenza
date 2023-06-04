import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { CampagneService } from 'src/app/services/campagne.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  updatedCampagne: boolean = false;
  
  campagne = {
    nom: '',
    description: ''
  };

  updatedCampagnes: string[] = [];

  token: string;

  message: string = '';

  selectedCampagne: string = '';


  constructor(private route: ActivatedRoute, private elementRef: ElementRef, public shared: SharedService, private campagneService: CampagneService, private router: Router) {

  }


  ngOnInit(): void {
    const tokenKey = this.shared.getAnnonceurToken();
    console.log(tokenKey)
    this.token = this.route.snapshot.queryParamMap.get(tokenKey) || '';
    console.log(this.token);
    this.router.navigate(['/campagnes'], { queryParams: { token: this.shared.getAnnonceurToken() } });

    this.campagneService.getAllCampagnes().subscribe(
      (data: any[]) => {
        console.log(data);
        this.campagnes = data;
        this.updatedCampagne = false;
      },
      error => {
        console.log(error);
      }
    );

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }


  isCampagneUpdated(updateDate: string): boolean {
    return updateDate !== null && updateDate !== undefined && updateDate !== 'Pas de Modification';
  }

  getNomCampagne(nomA: string): string {
    console.log(this.nomA);
    this.nomA = nomA;
    return nomA;
  }

  useNomCampagne() {
    console.log(this.getNomCampagne(this.nomA));
  }

  isUpdateDateNotSet(updateDate: string): boolean {
    const desiredDate = new Date('1000-01-01 00:00:00');
    const currentDate = new Date(updateDate);
    return currentDate.getTime() === desiredDate.getTime();
  }



  updateCampagne(event: Event): void {
    event.preventDefault(); // prevent unwanted events
    console.log(this.getNomCampagne(this.nomA));
    this.campagneService.updateCampagne(this.getNomCampagne(this.nomA), this.nom, this.description).subscribe(
      response => {
        console.log('Campagne est mise à jour avec succès');
        this.message = response.message;
        const updatedCampagneIndex = this.campagnes.findIndex(campagne => campagne.nom === this.getNomCampagne(this.nomA));
        if (updatedCampagneIndex !== -1) {
          this.campagnes[updatedCampagneIndex].nom = response.campagne.nom;
          this.campagnes[updatedCampagneIndex].description = response.campagne.description;
          this.campagnes[updatedCampagneIndex].start_date = response.campagne.start_date;
          this.campagnes[updatedCampagneIndex].update_date = response.campagne.update_date;
        }
      },
      error => {
        console.log('Erreur lors de la mise à jour:', error);
      }
    );
  
    // Reset the form fields
    this.nom = '';
    this.description = '';
  }
  
  


  deleteCampagne(nom: string) {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la campagne publicitaire ${nom}?`)) {
      console.log(this.nom);
      this.campagneService.deleteCampagne(nom).subscribe(
        res => {
          console.log(res)
          const index = this.campagnes.findIndex(campagne => campagne.nom === nom);
          this.campagnes.splice(index, 1);
          alert(`Suppression de la campagne publicitaire ${nom} avec succés`);
        },
        err => {
          console.error(err);
        });
    }
  }


  createCampagne(campagne: any) {
    this.campagneService.createCampagne(campagne)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          
          const newCampagne = {
            nom: response.campagne.nom,
            description: response.campagne.description,
            start_date: response.campagne.start_date,
            update_date: response.campagne.update_date
          };
  
          this.campagnes.push(newCampagne);
        },
        error => {
          console.log(error);
          this.message = error.message;
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

