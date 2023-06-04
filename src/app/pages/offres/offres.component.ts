import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/services/paiement.service';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

  offres: any[];
  email: string = '';

  constructor(private route: ActivatedRoute,private paiementService: PaiementService, private _router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email'] || '';
      console.log(this.email);
      this.getEmail();
    });
    this.getOffres();

  }

  getEmail() {
    console.log(this.email);
  } 

  

  getOffres(): void {
    this.paiementService.getOffres().subscribe(data => {
      this.offres = data.offres;
    });
  }

  payerwithFlouci() {
    const paymentData = { amount: 5000 };
    axios
      .post(`http://127.0.0.1:3006/paiementService/annonceur/payementwithFlouci`, paymentData)
      .then(res => {
        const { result } = res.data;
        window.location.href = result.link;
      })
      .catch(error => {
        console.error(error);
        console.log(paymentData);
      })
  }

  payer(email: string, offreId: string) {
    this.paiementService.payer(this.email, offreId)
      .subscribe(
        () => {
          console.log('Payment successful');
        },
        error => {
          console.error(error);
        }
      );
  }
}
