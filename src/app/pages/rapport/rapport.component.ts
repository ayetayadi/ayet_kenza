import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})



export class RapportComponent implements AfterViewInit, OnInit{

  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;
  nom_campagne: string = '';
  nom_banner: string = '';
  rapports: any[] = [];

  constructor( private route: ActivatedRoute, private bannerService: BannerService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nom_campagne = params.get('nom_campagne')|| '';
      this.nom_banner = params.get('nom_banner')|| '';
      this.getRapportByBanner(this.nom_campagne,this.nom_banner );

    });
  }

  getRapportByBanner(nom_campagne: string, nom_banner: string) {
    this.bannerService.getRapportByBanner(this.nom_campagne, this.nom_banner)
      .subscribe(
        (response: any) => {
          this.rapports = response.rapports;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
        ],
        datasets: [
          {
            label: 'Vues',
            fill: false,
            backgroundColor: 'rgb(198, 190, 238)',
            borderColor: '#9155FD',
            data: [65, 59, 80, 81],
          },
          {
            label: 'clics',
            fill: false,
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: '#FF0000',
            data: [40, 32, 55, 68],
          },
          {
            label: 'Impressions',
            fill: false,
            backgroundColor: 'rgb(0, 255, 0)',
            borderColor: '#00FF00',
            data: [75, 81, 63, 70],
          },
        ],
      },
    });
  }
  
}
