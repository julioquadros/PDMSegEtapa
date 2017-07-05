import { AddLivro } from './../add-livro/add-livro';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  constructor (public navCtrl:NavController,
              ){

  }
  irPagAddLivro(){
    this.navCtrl.push(AddLivro);
  }
}

