import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-adhome',
  templateUrl: './adhome.component.html',
  styleUrls: ['./adhome.component.css']
})

export class AdhomeComponent implements OnInit {
  annonceurs: any[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef, public shared: SharedService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAnnonceurs().subscribe((data: any[]) => {
      console.log(data);
      this.annonceurs = data;
    }, error => {
      console.log(error);
    });

}
}
