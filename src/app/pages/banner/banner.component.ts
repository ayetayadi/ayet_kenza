import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  

  id: string = '';

  nom_campagne:string = '';
  nom: string = '';
  description: string = '';
  width: string = '';
  height: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  title: string = '';
  subtitle: string = '';
  htmlcode: string = '';
  placeholder: string = '';
  image: string = '';
  constructor(private route: ActivatedRoute, private bannerService: BannerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log(this.id);
      this.getBanner(); // Call getBanner() here
    });
  }

  getBanner(){
    const id = this.route.snapshot.paramMap.get('id');
    this.bannerService.getBannerById(this.id).subscribe(
      (response) => {
        console.log(response)
        this.nom_campagne = response.nom_campagne;
        console.log(this.nom_campagne)
        this.nom = response.nom;
        console.log(this.nom)
        this.description = response.description;
        console.log(this.description)
        this.height = response.height;
        console.log(this.height)
        this.width = response.width;
        console.log(this.width)
        this.createdAt = response.createdAt.replace(/T\d{2}-\d{2}-\d{2}\.\d{3}Z/, '');
        console.log(this.createdAt)
        this.title = response.title;
        console.log(this.title)
        this.subtitle = response.subtitle;
        console.log(this.subtitle)
        this.htmlcode = response.htmlcode;
        console.log(this.htmlcode)
        this.placeholder = response.placeholder;
        console.log(this.placeholder) 
        this.image = response.image;
        console.log(this.image)     
       },
      (error) => {
        console.error(error);
      }
    );
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
