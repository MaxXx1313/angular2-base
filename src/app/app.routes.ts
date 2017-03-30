import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from '../page/example/example';
import { AboutComponent }   from '../page/about/about';
import { LoginPage }   from '../page/login/login';

// https://angular.io/docs/ts/latest/guide/router.html
const ROUTES: Routes = [
    {  path: '',       component: ExampleComponent },
    {  path: 'about',  component: AboutComponent   },
    {  path: 'login',  component: LoginPage   }
];

// enable hash temporaly
export const ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

