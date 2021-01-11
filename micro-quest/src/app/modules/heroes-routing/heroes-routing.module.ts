import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroCreateComponent } from 'src/app/components/heroes/hero-create/hero-create.component';
import { HeroListComponent } from 'src/app/components/heroes/hero-list/hero-list.component';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
    data: { animation: 'HeroList' },
  },
  {
    path: 'create',
    component: HeroCreateComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
