import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from '../pages/example/example';
import { AboutComponent } from '../pages/about/about';

const ROUTES: Routes = [
    {
        path: '',
        component: ExampleComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES);

