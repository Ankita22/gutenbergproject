import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import * as Chartist from 'chartist';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }
  loading = false;
  public ngOnInit() {
   
   }

   // Navigate to Books with param as book category
   goToBooksDetails(booktype){
    console.log('sending data : ',booktype);
    this.router.navigate(["/books"], { queryParams: { bookType: booktype } });

   }
}
