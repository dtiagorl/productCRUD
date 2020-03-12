import { Routes, RouterModule } from '@angular/router';

import { ProdutosComponent } from './produtos';
import { LoginComponent } from './login';
import { AuthGuard } from './helpers';

const routes: Routes = [
  { path: '', component: ProdutosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // caso contrario redireciona para home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
