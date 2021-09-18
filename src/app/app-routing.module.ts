import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SearchPage} from './search/search.page';
import {SearchPageModule} from './search/search.module';

const routes: Routes = [
    /*  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },*/
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule)
    },
    {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationPageModule)
    },
    {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'details',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
    },
    {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule)
    },  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
