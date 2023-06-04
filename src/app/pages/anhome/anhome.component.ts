import { Component, OnInit } from '@angular/core';
import { CampagneService } from 'src/app/services/campagne.service';
import { BannerService } from 'src/app/services/banner.service';
import { TeamService } from 'src/app/services/team.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-anhome',
  templateUrl: './anhome.component.html',
  styleUrls: ['./anhome.component.css']
})
export class AnhomeComponent implements OnInit {
  campagnes: any[] = [];
  banners: any[] = [];
  equipes: any[] = [];

  constructor(private campagneService: CampagneService, private bannerService: BannerService, private teamService: TeamService,  private shared: SharedService) { }

  ngOnInit(): void {
    this.campagneService.getAllCampagnes().subscribe(
      (data: any[]) => {
        console.log(data);
        this.campagnes = data;
      },
      error => {
        console.log(error);
      }
    );

    this.bannerService.getAllBannersByAnnonceur().subscribe(data => {
      console.log(data);
      this.banners = data.banners;
    }, error => {
      console.log(error);
    });

    this.teamService.getTeamsForAnnonceur(this.shared.getAnnonceurToken())
    .subscribe((data: any[]) => {
      console.log(data);
      this.equipes = data;
    });
  }

}
