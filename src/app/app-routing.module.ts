import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./component/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./component/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./component/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./component/tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'mot-de-passe-oublie',
    loadChildren: () => import('./component/mot-de-passe-oublie/mot-de-passe-oublie.module').then( m => m.MotDePasseOubliePageModule)
  },
  {
    path: 'mise-ajour-mot-de-passe',
    loadChildren: () => import('./component/mise-ajour-mot-de-passe/mise-ajour-mot-de-passe.module').then( m => m.MiseAJourMotDePassePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
