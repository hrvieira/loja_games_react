import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import Produtos from "../../../models/Produtos";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListarProdutos() {
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    async function ListarProdutos() {
        try {
            await listar("/produtos", setProdutos);
        } catch (error: any) {
            alert("Erro ao listar as Categorias");
        }
    }

    useEffect(() => {
        ListarProdutos();
    }, [produtos.length]);

    return (
        <>
            {produtos === undefined && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div
                className="
                bg-gray-200 
                flex 
                justify-center
                "
            >
                <div className="my-4 container flex flex-col">
                    {produtos.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma categoria foi encontrada
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {produtos.map((produtos) => (
                            <CardProdutos
                                key={produtos.id}
                                produtos={produtos}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarProdutos;
