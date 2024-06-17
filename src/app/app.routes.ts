import { Routes } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { ProcessFormComponent } from './process-form/process-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/processos', pathMatch: 'full' },
  { path: 'processos', component: ProcessListComponent },
  { path: 'process/:id', component: ProcessDetailComponent },
  { path: 'new', component: ProcessFormComponent },
  { path: 'editar-processo/:id', component: ProcessFormComponent }
];
