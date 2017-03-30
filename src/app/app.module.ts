import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ROUTING } from './app.routes';
import { AppComponent } from './app.component';

import { ExampleComponent } from '../page/example/example';
import { AboutComponent }   from '../page/about/about';
import { LoginPage }        from '../page/login/login';

import { MenuComponent }    from '../component/menu/menu';

import { AuthService }      from '../service/AuthService';


@NgModule({
    imports: [ BrowserModule, HttpModule, ROUTING ],
    declarations: [
        AppComponent,
        AboutComponent,
        ExampleComponent,
        LoginPage,
        MenuComponent
    ],
    providers:[
      AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

