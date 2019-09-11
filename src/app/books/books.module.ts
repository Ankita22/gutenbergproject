import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { BooksComponent } from './books.component';
import { BooksRoutes } from './books.routing';
import { IonicUnzip } from 'angular-ionic-unzip';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BooksRoutes),
        FormsModule,
        MaterialModule,
        NgxLoadingModule
    ],
    declarations: [BooksComponent]
})

export class BooksModule {}
