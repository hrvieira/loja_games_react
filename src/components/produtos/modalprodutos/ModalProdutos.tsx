import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./ModalProdutos.css";
import FormProdutos from "../formprodutos/FormProdutos";

function ModalProdutos() {
    return (
        <>
            <Popup
                trigger={
                    <button className="hover:bg-indigo-700 hover:pointer hover:shadow-lg rounded text-white font-bold border-white border-solid border-2 mt-4 py-2 px-4">
                        Novo Produto
                    </button>
                }
                modal
            >
                <div>
                    <FormProdutos />
                </div>
            </Popup>
        </>
    );
}

export default ModalProdutos;
