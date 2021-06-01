import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from '@layout/home/home.component';
import { BooksComponent } from '@modules/books/books.component';
import { AllBooksComponent } from '@modules/books-all/books-all.component';
import { StudentsComponent} from '@modules/users/users.component';
import { StudentsConsultComponent } from '@modules/users-all/users-all.component';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { CatalogsComponent } from '@modules/catalogs/catalogs.component';
import { CustomerComponent } from './views/customer/customer.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { AnimalesComponent } from '@modules/animales/animales.component';
import { CreateanimalesComponent } from '@modules/createanimales/createanimales.component';
import { RegistryComponent } from './auth/registry/registry.component';
import { CalculadoraComponent } from './auth/calculadora/calculadora.component';
// import { RoleGuard } from '@guards/role.guard';
import { ForgoutPasswordComponent } from './auth/forgout-password/forgout-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component'
// import { PrvEmptyComponent } from './components/prv-empty/prv-empty.component';
import { ManagerComponent } from './views/manager/manager.component';
// import { ACL } from './shared/security/acl';
// import { MainGuard } from '@guards/main.guard';
const routes: Routes = [

  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent},
  { path: 'signup', component: RegistryComponent},
  { path: 'forgot-password', component: ForgoutPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'calculadora', component: CalculadoraComponent},

  {
    path: 'home', component: HomeComponent,
    data: [
      'MANAGER',
      'CLIENT'
    ],
    // redirectTo: ACL.getDefaultRedirectPath(),
    // canActivate: [MainGuard],
    children: [
      {
        path: 'manager', component: ManagerComponent,
        // data: [
        //   'MANAGER'
        // ],
        children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'add-book', component: BooksComponent},
          { path: 'all-book', component: AllBooksComponent},
          { path: 'edit-book/:id', component:BooksComponent},
          { path: 'students', component: StudentsComponent},
          { path: 'students-consult', component: StudentsConsultComponent},
          { path: 'catalog', component: CatalogsComponent},
          { path: 'animales', component: AnimalesComponent},
          { path: 'edit-animales/:id', component: CreateanimalesComponent},
          // { path: 'createanimales', component:PrvEmptyComponent},
        ]
      },
      {
        path: 'customer', component: CustomerComponent,
        data: {
          role: 'CLIENT'
        },
        children: [
          { path: 'gallery', component: GalleryComponent},
        ]
      }
    ]
  }
];

//  routes.beforeEach((to, from, next) => ACL.getAuthorizedPath(to, next));

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }