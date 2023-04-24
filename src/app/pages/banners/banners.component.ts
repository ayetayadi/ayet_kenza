import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { CampagneService } from 'src/app/services/campagne.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners: any[] = [];
  campagnes: any[] = [];

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  campagnesWithBanners: any[] = [];

  nom_campagne: string = '';

  constructor(private route: ActivatedRoute, private campagneService: CampagneService, private bannerService: BannerService, private router: Router) {
  }

  navigateToUpload() {
    this.router.navigate(['/téléchargerBannière']);
  }

  
  navigateToDesign() {
    this.router.navigate(['/design']);
  }

  ngOnInit(): void {
    this.nom_campagne = this.route.snapshot.paramMap.get('nom_campagne') || '';
    console.log(this.nom_campagne);
    this.getAllBannersByCampagne();
}
  

  getAllCampagnes(): void{
    this.campagneService.getAllCampagnes().subscribe((data: any[]) => {
      console.log(data);
      this.campagnes = data;
      this.getAllBannersByCampagne();
    }, error => {
      console.log(error);
    });
  }

  getAllBannersByCampagne() {
    this.bannerService.getAllBannersByCampagne(this.nom_campagne).subscribe((data: any[]) => {
      console.log(data);
      this.banners = data;
    }, error => {
      console.log(error);
    });
  }


  onCarouselClick(bannerId: any) {
    this.router.navigate(['/banner', bannerId]);
  }


  getPaginatedBanners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredBanners = this.banners;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredBanners = filteredBanners.filter(
        banners =>
          banners.nom.toLowerCase().includes(searchTextLower) 
      );
    }
    return filteredBanners.slice(start, end);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.banners.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.banners.length / this.itemsPerPage);
  }

}