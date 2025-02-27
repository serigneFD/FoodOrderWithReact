import Modal from "./Modal.jsx"
import CarContext from "../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
export default function Cart() {
    const carCtx = useContext(CarContext);

    // Calcul the price total 
    const cartTotal = carCtx.items.reduce((totalPrix, item) => 
        totalPrix + item.quantity * item.prix, 0)

    return (
   <Modal className="cart">
    <h2>Your Cart</h2>
    <ul>
        {carCtx.items.map((item) => (
            <li key={item.id}>
             {item.nam} - {item.quantity}
            </li>
        ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="cart-actions">
        <button>Close</button>
        <button>Go to Checkout</button>
    </p>
   </Modal>
    )
}