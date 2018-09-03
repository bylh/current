import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  animal: string;
  name: string;


  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(public fb: FormBuilder, public dialog: MatDialog) { }
  ngOnInit() {
    this.form = this.fb.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  submitForm() {
    console.log('hello', this.form, JSON.stringify(this.form.value));
  }
  signUp() {
    console.log('注册');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '400px',
      // width: '600px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
