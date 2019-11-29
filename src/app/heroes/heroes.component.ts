import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  heroes: Hero[];
  // selectedHero: Hero;
  constructor(private heroService: HeroService) {
    this.heroService = heroService;
  }

  ngOnInit() {
    // 在ngOnInit生命周期钩子中调用(涉及ajax);让构造函数保持简单,只做一些初始化操作;
    this.getHeroes();
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
  // onNotify() {
  //   window.alert(this.selectedHero.name);
  // }
  getHeroes(): void {
    // 实际上: Observable.subscribe();
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
