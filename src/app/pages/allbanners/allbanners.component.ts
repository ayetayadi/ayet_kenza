import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-allbanners',
  templateUrl: './allbanners.component.html',
  styleUrls: ['./allbanners.component.css']
})
export class AllbannersComponent implements OnInit {

  banners: any[] = [];

  selectedStatus: string = '';


  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  campagnesWithBanners: any[] = [];

  isLoadingBanners = true;

  constructor(private bannerService: BannerService, private router: Router) { }

  ngOnInit(): void {
    this.isLoadingBanners = true;
    this.bannerService.getAllBannersByAnnonceur().subscribe(data => {
      console.log(data);
      this.banners = data.banners;
      this.isLoadingBanners = false;
    }, error => {
      console.log(error);
      this.isLoadingBanners = false;
    });
}

  getPaginatedBanners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredAnnonceurs = this.banners;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredAnnonceurs = filteredAnnonceurs.filter(
        banner =>
          banner.nom.toLowerCase().includes(searchTextLower) ||
          banner.nom_campagne.toLowerCase().includes(searchTextLower)

      );
    }
    return filteredAnnonceurs.slice(start, end);
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
