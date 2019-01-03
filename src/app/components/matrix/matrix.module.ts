import { MatrixComponent } from './matrix/matrix.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { CovalentLoadingModule } from '@covalent/core/loading';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    CovalentLoadingModule,
    MatTooltipModule
  ],
  declarations: [MatrixComponent],
  exports: [
    MatrixComponent
  ],
})
export class MatrixModule { }
