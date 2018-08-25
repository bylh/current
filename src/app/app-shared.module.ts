
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatIconModule,
  MatToolbarModule, MatExpansionModule, MatMenuModule, MatCardModule, MatTabsModule, MatDividerModule,
   MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatTableModule
} from '@angular/material';

import { SafePipe } from './pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ 
    SafePipe
  ],

  exports: [
    // pipe
    SafePipe,

    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 , verticalPosition: 'top'} },
  ]
})
export class AppSharedModule { }
