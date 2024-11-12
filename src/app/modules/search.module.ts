// search.module.ts
import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatCardModule }      from '@angular/material/card';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatChipsModule }     from '@angular/material/chips';
import { DragDropModule }     from '@angular/cdk/drag-drop';

import { SearchWidgetComponent } from '@/components/search-widget/search-widget.component';
import { SearchService }         from '@/services/search.service';
import { RouterModule }          from '@angular/router';

const SEARCH_ROUTES = [
  { 'path': '', 'component': SearchWidgetComponent }
];


@NgModule({
  declarations: [
    SearchWidgetComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    RouterModule.forChild(SEARCH_ROUTES),
    FormsModule,
  ],
  exports: [
    SearchWidgetComponent
  ],
  providers: [
    SearchService
  ]
})
export class SearchModule {
}
