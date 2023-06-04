import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { CampagneService } from 'src/app/services/campagne.service';
import { forkJoin } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners: any[] = [];
  campagnes: any[] = [];

  selectedStatus: string = '';


  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  campagnesWithBanners: any[] = [];

  nom_campagne: string = '';

  isLoadingBanners = true;

  typeOffre: string = '';

  constructor(private shared: SharedService, private route: ActivatedRoute, private accountService: AccountService, private campagneService: CampagneService, private bannerService: BannerService, private router: Router) {
  }


  ngOnInit(): void {
    this.nom_campagne = this.route.snapshot.paramMap.get('nom_campagne') || '';
    console.log(this.nom_campagne);
    this.getAllBannersByCampagne();
    this.getNomCampagne();

    const token = this.shared.getAnnonceurToken();
    this.accountService.getPermission(token).subscribe(
      response => {
        this.typeOffre = response.typeOffre;
      },
      error => {
        console.log(error);
      }
    );
  }

  getNomCampagne() {
    console.log(this.nom_campagne);
  }

  getAllCampagnes(): void {
    this.campagneService.getAllCampagnes().subscribe((data: any[]) => {
      console.log(data);
      this.campagnes = data;
      this.getAllBannersByCampagne();
    }, error => {
      console.log(error);
    });
  }

  getAllBannersByCampagne() {
    this.isLoadingBanners = true; // set isLoadingBanners to true
    this.bannerService.getAllBannersByCampagne(this.nom_campagne).subscribe(data => {
      console.log(data);
      this.banners = data.banners;
      this.isLoadingBanners = false; // set isLoadingBanners to false when data is loaded
    }, error => {
      console.log(error);
      this.isLoadingBanners = false; // set isLoadingBanners to false when an error occurs
    });
  }


  onCarouselClick(bannerId: any) {
    this.router.navigate(['/banner', bannerId]);
  }


  deleteBanner(nom_campagne: string, nom: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${nom} dans ${nom_campagne}?`)) {
      this.bannerService.deleteBanner(nom_campagne, nom)
        .subscribe(
          response => {
            {
              console.log(response);
              alert(`Votre bannière ${nom} de la campagne publicitaire ${nom_campagne} a été supprimé`)
            };
            const index = this.banners.findIndex(banner => banner.nom === nom);
            this.banners.splice(index, 1);
          },
          error => console.log(error)
        );
    }
  }

  getPaginatedBanners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredBanners = this.banners;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredBanners = filteredBanners.filter(
        banner =>
          banner.nom.toLowerCase().includes(searchTextLower)
      );
    }
    if (this.selectedStatus) {
      filteredBanners = filteredBanners.filter(
        banner =>
          this.banners[0].status === this.selectedStatus
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