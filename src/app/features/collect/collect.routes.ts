import { Routes } from '@angular/router';
import { CollectComponent } from './view/collect/collect.component';
import { BaseComponent } from './view/base/base.component';

export const COLLECT_ROUTES: Routes = [
  { path: 'register', component: CollectComponent },
  { path: 'base', component: BaseComponent },
];
