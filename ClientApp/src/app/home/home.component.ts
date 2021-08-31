import {AfterViewInit, Component, ElementRef, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-component',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public myForm = new FormGroup({});
  public n = 0;
  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      'myNum': ['', [Validators.min(1), Validators.max(500), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }
  nChanged() {
    if (this.myForm.valid === true && this.myForm.controls['myNum'].value !== '') {
      this.n = this.myForm.controls['myNum'].value;
    }
  }

  isInvalidControl(control: AbstractControl): boolean {
    if (control !== null && control !== undefined && control.disabled === false && !control.valid) {
      return true;
    }
    return false;
  }
}
