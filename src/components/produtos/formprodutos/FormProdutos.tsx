import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produtos from "../../../models/Produtos";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";


function FormProdutos() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: "" });
    const [produto, setProduto] = useState<Produtos>({} as Produtos);

    const { id } = useParams<{ id: string }>();

    async function listarProdutoPorId(id: string) {
        try {
            await listar(`/produtos/${id}`, setProduto);
        } catch (error: any) {
            if (error.toString().includes("401")) {
                alert("Produto não encontrado!")
            }
        }
    }

    async function listarCategoriaPorId(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria);
        } catch (error: any) {
            if (error.toString().includes("401")) {
                alert("Categoria não encontrada!");
            }
        }
    }

    async function buscarCategorias() {
        try {
            await listar(`/categorias`, setCategorias);
        } catch (error: any) {
            if (error.toString().includes("404")) {
                alert("Nenhuma Categoria encontrada!");
            }
        }
    }

    useEffect(() => {
        buscarCategorias();

        if (id !== undefined) {
            listarProdutoPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        });
    }

    function retornar() {
        navigate("/produtos");
    }

    async function cadastrarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id != undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto);

                alert("Produto atualizado com sucesso!");
            } catch (error: any) {
                if (error.toString().includes("404")) {
                    alert("Erro ao atualizar Produto!");
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto);

                alert("Produto cadastrado com sucesso!");
            } catch (error: any) {
                if (error.toString().includes("404")) {
                    alert("Erro ao cadastrar a Produto!");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoCategoria = categoria.tipo === "";

    return (
        <div className="container flex flex-col mx-auto items-center py-12">
            <h1 className="text-4xl text-center mb-8">
                {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
            </h1>

            <form
                className="flex flex-col w-1/2 gap-4"
                onSubmit={cadastrarNovoProduto}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome do produto</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Foto</label>
                    <input
                        type="foto"
                        placeholder="Foto do produto"
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        placeholder="Preço R$"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Escolha a categoria</p>
                    <select
                        name="tipo "
                        id="tipo"
                        className="border p-2 border-slate-800 rounded"
                        onChange={(e) =>
                            listarCategoriaPorId(e.currentTarget.value)
                        }
                    >
                        <option value="" selected disabled>
                            Selecione uma categoria
                        </option>

                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id}>
                                    {categoria.tipo}
                                </option>
                            </>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 bg-indigo-400 
                            hover:bg-indigo-800 text-white font-bold w-1/2 
                            mx-auto py-2 flex justify-center"
                    disabled={carregandoCategoria}
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>
                            {id !== undefined ? "Atualizar" : "Cadastrar"}
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormProdutos;
