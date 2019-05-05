import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'translate-tab',
        children: [
          {
            path: '',
            loadChildren: '../translate-tab/translate-tab.module#TranslateTabModule'
          }
        ]
      },
      {
        path: 'settings-tab',
        children: [
          {
            path: '',
            loadChildren: '../settings-tab/settings-tab.module#SettingsTabModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/translate-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/translate-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
