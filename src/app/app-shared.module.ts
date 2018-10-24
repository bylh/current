import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatIconModule,
  MatToolbarModule, MatExpansionModule, MatMenuModule, MatCardModule, MatTabsModule, MatDividerModule,
   MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatTableModule, MatDialogModule, MatListModule, MatCheckboxModule, MatRadioModule, MatOptionModule, MatSelectModule, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule
} from '@angular/material';

import { SafePipe } from './pipe';
import { PageDirective } from './page.directive';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ 
    SafePipe,
    PageDirective,
  ],

  exports: [
    // pipe
    SafePipe,
    PageDirective,

    FormsModule,
    ReactiveFormsModule,

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
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 , verticalPosition: 'top'}, },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}}
  ]
})
export class AppSharedModule { }
