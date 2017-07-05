import { LivroPage } from './../livro/livro';
import { NavController, NavParams } from 'ionic-angular';
import { LivroBasicoModelo } from './../../modelos/livro-basico.modelo';
import { LivroController } from './../../servicos/livro.controller';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-add-livro',
  templateUrl: 'add-livro.html',
})
export class AddLivro {
  listaLivros: LivroBasicoModelo[];

  constructor(private lvController: LivroController, 
              public navCtrl:NavController,
              public navParams:NavParams,
              private storage: Storage,
              private barcodeScanner: BarcodeScanner)
              {
              }

  ionViewWillEnter(){
    this.recuperarObjetosBibliografia();
    this.carregarLivros();
  }
  
  adicionarLivro(form: NgForm){
    this.lvController.adicionarLivro(form.value.txtISBN);
    this.salvarBibliografia();
    form.reset();
    this.carregarLivros();
  }

  private carregarLivros(){
    this.listaLivros = this.lvController.listarLivros();
  }

  livroSelecionado(index: number, isbnSelecionado: string){
    this.navCtrl.push(LivroPage, {isbn: isbnSelecionado});
  }
  excluirLivro(index: number){
    this.lvController.excluirLivro(index);
    this.salvarBibliografia();
    this.carregarLivros();
  }
  salvarBibliografia(){
    this.storage.set('bibliografia', this.listaLivros);
    console.log('Dados Salvos' + this.listaLivros);
  }
  recuperarObjetosBibliografia(){
    this.storage.get('bibliografia').then((data)=>{
      // console.log(data);
      if (!(data === undefined)){
        this.lvController.adicionarLivros(data);
        this.listaLivros = data;
      }
    });
  }

  async lerCodigoDeBarras(){
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData !== undefined)
      {
        this.lvController.adicionarLivro(barcodeData.text);
        this.salvarBibliografia();
        this.carregarLivros();
      }
      console.log(barcodeData);
    }, (err) => {
      console.log('erro');
    });
  }

}
