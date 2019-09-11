import { Routes } from '@angular/router';

import { BooksComponent } from './books.component';

export const BooksRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'books',
        component: BooksComponent
    }]
}
];
