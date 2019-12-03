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
  // 请求所有英雄列表
  getHeroes(): void {
    // 实际上: Observable.subscribe();
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  // 添加英雄
  add(name: string): void {
    console.log(name);
    name = name.trim(); // 去掉字符串的前后空格
    if (!name) { return; }
    // 调用服务的方法
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      // 推入数组,类属性数据改变视图自动改变
      this.heroes.push(hero);
    });
  }

  // 删除英雄
  delete(hero: Hero): void {
    // 过滤heros数组,触发视图更新
    this.heroes = this.heroes.filter(item => item !== hero);
    // 服务发出ajax,依旧要调用subscribe()
    this.heroService.deleteHero(hero).subscribe();
  }
}
