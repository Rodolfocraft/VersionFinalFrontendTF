import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { UserComponent } from './components/user/user.component';
import { CreaeditaUserComponent } from './components/user/creaedita-user/creaedita-user.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {path: 'home',
  component:LandingpageComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    children:[
      {path: 'nuevo', component:CreaeditaUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
