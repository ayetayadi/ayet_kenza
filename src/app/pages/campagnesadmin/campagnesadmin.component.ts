import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampagneService } from 'src/app/services/campagne.service';

@Component({
  selector: 'app-campagnesadmin',
  templateUrl: './campagnesadmin.component.html',
  styleUrls: ['./campagnesadmin.component.css']
})
export class CampagnesadminComponent implements OnInit {

  campagnes: any[];
  annonceurEmail: string = '';

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';
  
  constructor(private campagneService: CampagneService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.annonceurEmail = params.get('email')|| '';
      this.getCampagnesByAnnonceur(this.annonceurEmail);
    });
  }
  toDate(dateString: string): Date {
    return new Date(dateString);
  }
  
  isUpdateDateNotSet(updateDate: string): boolean {
    const desiredDate = new Date('1000-01-01 00:00:00');
    const currentDate = new Date(updateDate);
    return currentDate.getTime() === desiredDate.getTime();
  }
  
  
  getCampagnesByAnnonceur(email: string) {
    this.campagneService.getCampagnesByAnnonceur(email)
      .subscribe(data => {
        this.campagnes = data;
        console.log(`Found ${this.campagnes.length} campagnes publicitaires for annonceur "${this.annonceurEmail}"`);
      }, error => {
        console.error(error);
      });
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
