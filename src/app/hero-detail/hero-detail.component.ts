import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  // @Output() notify = new EventEmitter();
  constructor(
    // ActivatedRoute保存着到这个HeroDetailComponent实例的路由信息
    private route: ActivatedRoute,
    // heroService从远端服务器根据ID获取要显示的英雄
    private heroService: HeroService,
    // location 是一个angular服务,使用这个进行浏览器的导航
    private location: Location
    ) { }

  ngOnInit() {
    this.getHero();
  }
  // 获取匹配ID英雄
  getHero(): void {
    // console.log(this.route);
    // console.log(this.route.snapshot.paramMap.get('id'));
    // +操作符将字符串转换为数字类型
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
}
