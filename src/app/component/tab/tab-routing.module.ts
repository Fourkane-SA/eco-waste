import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
      path: 'accueil',
      loadChildren: () => import('../accueil/accueil.module').then(m => m.AccueilPageModule)
      },
      {
        path: 'recette',
        loadChildren: () => import('../recette/recette.module').then( m => m.RecettePageModule)
      },
      {
        path: 'mes-courses',
        loadChildren: () => import('../mes-courses/mes-courses.module').then( m => m.MesCoursesPageModule)
      },
      {
        path: 'poster-annonce',
        loadChildren: () => import('../poster-annonce/poster-annonce.module').then( m => m.PosterAnnoncePageModule)
      },
      {
        path: 'mes-annonces',
        loadChildren: () => import('../mes-annonces/mes-annonces.module').then( m => m.MesAnnoncesPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then( m => m.FavorisPageModule)
      },
      {
        path: 'noter-mes-vendeurs',
        loadChildren: () => import('../noter-mes-vendeurs/noter-mes-vendeurs.module').then( m => m.NoterMesVendeursPageModule)
      },
      {
        path: 'aide',
        loadChildren: () => import('../aide/aide.module').then( m => m.AidePageModule)
      },
      {
        path: 'edit-profil',
        loadChildren: () => import('../edit-profil/edit-profil.module').then( m => m.EditProfilPageModule)
      },
    ]
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
