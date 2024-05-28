import { Link } from "react-router-dom";
import Produtos from "../../../models/Produtos";

interface CardProdutosProps {
     produtos: Produtos;
}

function CardProdutos({ produtos }: CardProdutosProps) {
     return (
         <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
             <header className="py-2 px-6 bg-slate-700 text-center text-white font-bold text-2xl">
                 {produtos.categoria?.tipo}
             </header>
             <p className="px-8 py-4 text-center text-2xl bg-white">
                 {produtos.nome}
             </p>
             <div className="bg-white h-full flex justify-center">
                 <img
                     className="w-[50%]"
                     src={produtos.foto}
                     alt={`Capa do ${produtos.nome}`}
                 />
             </div>
             <p className="px-8 py-4 flex items-end justify-center text-2xl bg-white h-full">
                 R$ {produtos.preco}
             </p>
             <div className="flex">
                 <Link
                     to={`/editarproduto/${produtos.id}`}
                     className="w-full text-slate-100 bg-teal-400 hover:bg-teal-700 
                        flex items-center justify-center py-2"
                 >
                     <button>Editar</button>
                 </Link>

                 <Link
                     to={`/deletarproduto/${produtos.id}`}
                     className="text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                        flex items-center justify-center"
                 >
                     <button>Deletar</button>
                 </Link>
             </div>
         </div>
     );
}

export default CardProdutos;
