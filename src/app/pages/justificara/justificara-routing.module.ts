import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificaraPage } from './justificara.page';

const routes: Routes = [
  {
    path: '',
    component: JustificaraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificaraPageRoutingModule {}
