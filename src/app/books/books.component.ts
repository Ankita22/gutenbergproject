import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookCategory;
  booksResult;
  loading = false;
  dataPresent= false;
  constructor(@Inject(DOCUMENT) private document: Document,private router:Router, private activatedRoute: ActivatedRoute,private http:HttpService) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((params) => {
      this.bookCategory = this.activatedRoute.snapshot.queryParams["bookType"];
    });

    this.getBookDetailsByCategory(this.bookCategory);
  }

  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  // Redirect to resulting URL 
  showBookDetails(formats) {
    if(formats['text/html'] != undefined)
    {
      this.document.location.href = formats['text/html'];
    } else if(formats['application/pdf'] != undefined)
    {
      this.document.location.href = formats['application/pdf'];
    } else if(formats['text/html; charset=utf-8'] != undefined)
    {
      this.document.location.href = formats['text/html; charset=utf-8'];
    } else if(formats['text/plain; charset=utf-8'] != undefined)
    {
      this.document.location.href = formats['text/plain; charset=utf-8'];
    } else if(formats['text/plain; charset=us-ascii'] != undefined)
    {
      this.document.location.href = formats['text/plain; charset=us-ascii'];
    } else if(formats['text/plain; charset=iso-8859-1'] != undefined)
    {
      this.document.location.href = formats['text/plain; charset=iso-8859-1'];
    } else {
      alert('No viewable version available');
    }
    
  //   this.unzipService.unzip({
  //     dataDir:'',
  //     targetDir: '/images',
  //     fileName: 'images.zip'}).then(() => {
  //      //unzip complete
  //  }).catch((e) => {
  //      //unzipping failed
  //      console.log(e);
  //  }); 

  }

  // Get book details by category
  getBookDetailsByCategory(category){
    this.loading = true;
    this.http.getCall(this.http.getBookByCategory + category)
      .subscribe((result:any) => {
        this.loading = false;
        this.booksResult = result;
        this.booksResult.results.forEach(res=>{
          if(res.formats['image/jpeg']  != undefined)
          {
            this.dataPresent = true;
          }
            
        });
      },
      (err: any) => {
        this.loading = false;
      })
  }

}
