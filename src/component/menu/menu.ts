import { Component } from '@angular/core';
import { AuthService } from '../../service/AuthService';

@Component({
    selector: 'menu',
    templateUrl: 'component/menu/menu.html'
})
export class MenuComponent {

  user:number; // TODO: User

  constructor(public userService: AuthService){
    this.user = userService.getId();
  }
}

