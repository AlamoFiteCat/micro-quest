import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
})
export class HeroPageComponent implements OnInit {
  @Input() hero: Hero;

  constructor() {}

  ngOnInit(): void {}
}
