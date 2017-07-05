import { LivroBasicoModelo } from './../modelos/livro-basico.modelo';
export class LivroController{
    private livros: LivroBasicoModelo[] = [];

    adicionarLivro(isbn: string){
        this.livros.push(new LivroBasicoModelo(isbn));
        // console.log(this.livros);
    }

    adicionarLivros(livrosColecao: LivroBasicoModelo[]){
        this.livros = livrosColecao;
        // console.log(livrosColecao);
    }

    listarLivros(){
        return this.livros.slice();
    }

    excluirLivro(index: number){
        this.livros.splice(index, 1);
    }
    
}