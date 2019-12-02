import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// @Injectable把这个类标记为依赖注入系统的参与者之一
// HeroService类将会提供一个可注入的服务,并且它自己还可以拥有自己的待注入的依赖
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // 访问地址
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }
  // 所有英雄列表
  getHeroes(): Observable<Hero[]> {
    // of(HEROES) 会返回一个 Observable<Hero[]>
    // 使用HttpClient替换rxjs的of函数
    // HttpClient.get默认情况下把响应体当做无类型的JSON对象返回;
    // 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // pipe()方法来扩展Observable的结果
      // 用tap操作符窥探Observable数据流
      tap(_ => this.log('英雄列表拉取完毕')),
      // catchError()操作符会拦截失败的Observable.它会把错误对象传给错误处理器(handleError)
      catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  // 单个英雄
  getHero(id: number): Observable<Hero> {
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`英雄ID为:${id}`)),
      catchError(this.handleError<Hero>(`getHero得到单个英雄,id为:${id}`))
    );
  }
  // HandleError()不直接处理这些错误,而是返回给catchError一个错误处理函数.
  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      // 输出错误
      console.error(error);
      // 调用messageService服务
      this.log(`${operation} failed: ${error.message}`);
      // 返回一个空的result
      return of(result as T);
    };
  }

  // 服务中的服务
  private log(message: string) {
    this.messageService.add(`heroService已经拉取数据:${message}`);
  }
}
