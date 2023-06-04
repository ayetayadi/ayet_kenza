import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-autorisations',
  templateUrl: './autorisations.component.html',
  styleUrls: ['./autorisations.component.css']
})
export class AutorisationsComponent implements OnInit {

  autorisations: any[] = [];

  selectedStatus: string = '';

  annonceurEmail: string = '';
  nom: string = '';
  message: string = '';

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  isImageEnlarged: boolean = false;

  campagnesWithBanners: any[] = [];

  isLoadingBanners = true;

  isDetailsDisabled: boolean = true;

  description: string = '';
  width: string = '';
  height: string = '';
  callToAction: string = '';
  createdAt: string = '';
  updateAt: string = '';
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  title: string = '';
  subtitle: string = '';
  htmlcode: string = '';
  status: string = '';
  placeholder: string = '';
  plateformeType: string = '';


  autorisation = {
    description: '',
    width: '',
    height: '',
    callToAction: '',
    createdAt: '',
    updateAt: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    title: '',
    subtitle: '',
    htmlcode: '',
    status: '',
    placeholder: '',
    plateformeType: '',
};


  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.annonceurEmail = params.get('email') || '';
      this.nom = params.get('nom') || '';
      this.getBanners(this.nom, this.annonceurEmail);
    });

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  getBanners(nom: string, email: string) {
    this.isLoadingBanners = true;
    this.bannerService.getAllBannersAuthorisationsByAnnonceur(nom, email).subscribe(data => {
      console.log(data);
      this.autorisations = data.autorisations;
      this.isLoadingBanners = false;
    }, error => {
      console.log(error);
      this.isLoadingBanners = false;
    });
  }

  getNomBanner(nom: string): string {
    console.log(this.nom);
    this.nom = nom;
    return nom;
  }

  useNomCampagne() {
    console.log(this.getNomBanner(this.nom));
  }

 authorizeBanner(nom: string, isAuthorized: boolean) {
    const autorisation = this.autorisations.find(item => item.nom === nom);
    if (autorisation) {
        if (isAuthorized) {
            autorisation.accepted = true;
            autorisation.rejected = false;
        } else {
            autorisation.accepted = false;
            autorisation.rejected = true;
        }
    }
    this.bannerService.authoriserBanner(nom, isAuthorized).subscribe(response => {
        console.log(response);
        this.message = `Autorisation envoyée avec succès à ${this.annonceurEmail}`;
        alert(this.message);
    });
}


  getPaginatedAuthorizeBanners() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredAnnonceurs = this.autorisations;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredAnnonceurs = filteredAnnonceurs.filter(
        autorisation =>
          autorisation.nom.toLowerCase().includes(searchTextLower) ||
          autorisation.nom_campagne.toLowerCase().includes(searchTextLower)

      );
    }
    return filteredAnnonceurs.slice(start, end);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.autorisations.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.autorisations.length / this.itemsPerPage);
  }

   enlargeImage(event: Event) {
    this.isImageEnlarged = true;
  }

  openModal(autorisation: any) {
    this.isDetailsDisabled = false;
  
    this.description = autorisation.description;
    this.width = autorisation.width;
    this.height = autorisation.height;
    this.callToAction = autorisation.callToAction;
    this.createdAt = autorisation.createdAt;
    this.updateAt = autorisation.updateAt;
    this.startDate = autorisation.startDate;
    this.endDate = autorisation.endDate;
    this.startTime = autorisation.startTime;
    this.endTime = autorisation.endTime;
    this.title = autorisation.title;
    this.subtitle = autorisation.subtitle;
    this.htmlcode = autorisation.htmlcode;
    this.status = autorisation.status;
    this.placeholder = autorisation.placeholder;
    this.plateformeType = autorisation.plateformeType;
  }
  
  resetDetails() {
    this.description ='';
    this.width = '';
    this.height = '';
    this.callToAction = ''
    this.createdAt = '';
    this.updateAt = '';
    this.startDate = '';
    this.endDate = '';
    this.startTime = '';
    this.endTime = '';
    this.title = '';
    this.subtitle = '';
    this.htmlcode = '';
    this.status = '';
    this.placeholder = '';
    this.plateformeType = '';
  
    this.isDetailsDisabled = true;
  }
  
  showDetails(autorisation: any): void {
    this.autorisation = autorisation;
  }
  
  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = this.htmlcode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
 }
 
    
}
