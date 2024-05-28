import Categoria from "./Categoria";

export default interface Produtos {

     id: number;
     nome: string;
     preco: string;
     foto: string;
     categoria: Categoria | null;
     
}