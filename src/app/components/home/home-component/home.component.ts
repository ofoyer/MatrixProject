import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router"

const DIMENSIONS_REGEX = '\\d{1,4},\\d{1,4}';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private formGroup: FormGroup;
  private n;
  private m;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      dimensions: [null, [Validators.pattern(DIMENSIONS_REGEX)]],
    });
  }

  private setDimensions() {
    const dimensionControl = this.formGroup.get('dimensions');
    const [n, m] = dimensionControl.value.split(',');
    this.n = n;
    this.m = m;
  }

  private toMatrixScreen(draw): void {
    if (!this.areDimensionsValid()) return this.showDimensionsErrorMessage();
    this.setDimensions();

    this.router.navigate(['/matrix'], { queryParams: { draw, n: this.n, m: this.m } });
  }

  private areDimensionsValid(): boolean {
    const dimensionControl = this.formGroup.get('dimensions');

    return dimensionControl.dirty && dimensionControl.valid;
  }

  private showDimensionsErrorMessage() {
    this.snackBar.open(
      'Numbers should be in the interval [1,1200]',
      'Understood',
      { duration: 30000, panelClass: 'error-dialog' }
    );
  }
}
