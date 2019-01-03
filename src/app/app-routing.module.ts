import { MatrixComponent } from './components/matrix/matrix/matrix.component';
import { HomeComponent } from './components/home/home-component/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'matrix', component: MatrixComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}