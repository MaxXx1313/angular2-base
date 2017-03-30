import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ROUTING } from './app.routes';
import { AppComponent } from './app.component';

import { ExampleComponent } from '../pages/example/example';
import { AboutComponent }   from '../pages/about/about';


@NgModule({
    imports: [ BrowserModule, ROUTING ],
    declarations: [
        AppComponent,
        AboutComponent,
        ExampleComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

