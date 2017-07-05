import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-livro',
  templateUrl: 'livro.html'
})
export class LivroPage {

  livro: any;
  titulo: string;
  subtitulo: string;
  autores: string;
  numpaginas: string;
  editora: string;
  resumo: string;
  datapublicacao: string;
  avaliacao: string;
  thumbnail: string;
  //isbn: string = '9788535253191';// Pai Rico Pai Pobre
  //isbn: string = '9780935739282';// JavaScript
  isbn: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) 
  {
    this.buscarInfoLivro();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LivroPage 1');
  }

  buscarInfoLivro(){
    this.isbn = this.navParams.get('isbn');
    this.http.get
      ('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ this.isbn)
      .map
        (res => res.json())
        .subscribe
          (data => 
            {
              if (!(data === undefined))
              {
                this.livro = data.items[0];
                this.titulo = this.livro["volumeInfo"]["title"];
                this.subtitulo = this.livro["volumeInfo"]["subtitle"];
                this.autores = this.livro["volumeInfo"]["authors"];
                this.numpaginas = this.livro["volumeInfo"]["pageCount"];
                this.editora = this.livro["volumeInfo"]["publisher"];
                this.datapublicacao = this.livro["volumeInfo"]["publishedDate"];
                this.thumbnail = this.livro["volumeInfo"]["imageLinks"]["smallThumbnail"];
                this.avaliacao = this.livro["volumeInfo"]["averageRating"];
              }
              // console.log(this.livro);
            }
          );
  }

}
