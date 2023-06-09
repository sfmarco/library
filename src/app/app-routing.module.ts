import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RolGuard } from './core/guards/rol.guard';
import { ACL } from './security/acl';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch:'full'
  },
  {
    path:'auth',
    canLoad: [AuthGuard],
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',
    canActivate: [AuthGuard],
    data: {
      authorities: [
        'MANAGER',
        'CUSTOMER'
      ]
    },
    children: [
      {
        path: '',
        redirectTo: ACL.getDefaultRedirectPath(), pathMatch: 'full'
      },
      {
        path:'profile',
        canActivate: [RolGuard],
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: {
          authorities: [
            'MANAGER',
            'CUSTOMER'
          ]
        }
      },
      {
        path:'manager',
        canActivate: [RolGuard],
        loadChildren: () => import('./views/manager/manager.module').then(m => m.ManagerModule),
        data: {
          authorities: ['MANAGER']
        }
      },
      {
        path:'customer',
        canActivate: [RolGuard],
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule),
        data: {
          authorities: ['CUSTOMER']
        }
      }
    ]
  },
  {
    path:'**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], //el preload acelera la carga diferida(lazy loading)

  exports: [RouterModule]
})
export class AppRoutingModule { }
