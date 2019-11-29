import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { MessageService } from './message.service';
// @Injectable把这个类标记为依赖注入系统的参与者之一
// HeroService类将会提供一个可注入的服务,并且它自己还可以拥有自己的待注入的依赖
@Injectable({
  providedIn: 'root'
})
export class HeroService {
private count: number;
constructor(private messageService: MessageService) {
  this.count = 0;
}

getHeroes(): Observable<Hero[]> {
  // 服务中的服务
  this.count++;
  this.messageService.add(`heroService已经拉取数据,往messageService中添加${this.count}条消息`);
  // of(HEROES) 会返回一个 Observable<Hero[]>
  // 它会发出单个值，这个值就是这些模拟英雄的数组
  return of(HEROES);
}
getHero(id: number): Observable<Hero> {
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
}
