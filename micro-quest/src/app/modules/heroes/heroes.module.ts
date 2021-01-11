import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from '../heroes-routing/heroes-routing.module';
import { HeroListComponent } from 'src/app/components/heroes/hero-list/hero-list.component';
import { HeroPageComponent } from 'src/app/components/heroes/hero-page/hero-page.component';
import { HeroCreateComponent } from 'src/app/components/heroes/hero-create/hero-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeroListComponent, HeroPageComponent, HeroCreateComponent],
  imports: [CommonModule, HeroesRoutingModule, SharedModule],
})
export class HeroesModule {}
