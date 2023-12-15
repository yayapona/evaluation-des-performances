import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';



const routes: Routes = [
  
  {path:'',
   component: MainLayoutComponent,
   children: [
    {
      path:'dashboard', 
      loadChildren: ()=> import('./dashboard/dashboard.module').then( m => m.DashboardModule)
    },
    {
      path:'p1', 
      loadChildren: ()=> import('./p1/p1.module').then( m => m.P1Module)
    },
    {
      path:'p2', 
      loadChildren: ()=> import('./p2/p2.module').then( m => m.P2Module)
    },
    {
      path:'p3', 
      loadChildren: ()=> import('./p3/p3.module').then( m => m.P3Module)
    },
    {
      path:'p4', 
      loadChildren: ()=> import('./p4/p4.module').then( m => m.P4Module)
    },
    {
      path:'p5',
      loadChildren: ()=> import('./p5/p5.module').then( m => m.P5Module)
    },
    {
      path:'p6',
      loadChildren: ()=> import('./p6/p6.module').then( m => m.P6Module)
    },
    {
      path:'p7',
      loadChildren: ()=> import('./p7/p7.module').then( m => m.P7Module)
    },
    {
      path:'p8',
      loadChildren: ()=> import('./p8/p8.module').then( m => m.P8Module)
    },
    
    {
      path:'not-found', 
      loadChildren: ()=> import('./not-found/not-found.module').then( m => m.NotFoundModule)
    },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full',
    },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
