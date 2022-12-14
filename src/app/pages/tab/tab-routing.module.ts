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
        path: 'editAnnonce/:id',
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
        path: 'noter/:uid',
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
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'annonce/:id',
        loadChildren: () => import('../annonce/annonce.module').then( m => m.AnnoncePageModule)
      },
      {
        path: 'profil/:id',
        loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: 'conversation/:id',
        loadChildren: () => import('../conversation/conversation.module').then( m => m.ConversationPageModule)
      },
      {
        path: 'conversation/:uid/:aid',
        loadChildren: () => import('../conversation/conversation.module').then( m => m.ConversationPageModule)
      },
    {
      path: 'recette-detail/:title',
      loadChildren: () => import('../recette-detail/recette-detail.module').then( m => m.RecetteDetailPageModule)
    },
    {
      path: 'life-hack-detail/:title',
      loadChildren: () => import('../life-hack-detail/life-hack-detail.module').then( m => m.LifeHackDetailPageModule)
    },
    ]
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
