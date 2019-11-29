import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  // 在应用的顶级配置这个路由.forRoot()方法会提供路由所需的服务提供商和指令还会基于浏览器的当前URL执行首次导航
  imports: [RouterModule.forRoot(routes)],
  // 导出RouterModule让路由器的相关指令可以在AppModule中的组件中使用
  exports: [RouterModule]
})
export class AppRoutingModule { }
