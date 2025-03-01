import Modal from "./Modal.jsx"
import CarContext from "../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const carCtx = useContext(CarContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    // Calcul the price total 
    const cartTotal = carCtx.items.reduce(
        (totalPrix, item) => totalPrix + item.quantity * item.price, 0);
    
        function handleCartClose() {
            userProgressCtx.hideCart();
        }
       
        function handleGoToCheckOut() {
            userProgressCtx.showCheckout();
        }

    return (
   <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCartClose : null}>
    <h2>Your Cart</h2>
    <ul>
        {carCtx.items.map((item) => (
            <CartItem key={item.id} 
            {...item}
            onIncrease={() => carCtx.addItem(item)}
             onDecrease={() => carCtx.removeItem(item.id)}
            />
        ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
        <Button onClick={handleCartClose} textOnly={true}>Close</Button>
        <Button onClick={handleGoToCheckOut}>Go to Checkout</Button>
    </p>
   </Modal>
    )
}