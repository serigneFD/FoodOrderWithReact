import { useContext, useActionState } from "react";
import Modal from "./Modal"
import CarContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
}
};

export default  function Checkout() {
    const cartCtx = useContext(CarContext);
    const userProgress = useContext(UserProgressContext);

    const {data, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);
    // Calcul the price total 
    const cartTotal = cartCtx.items.reduce(
        (totalPrix, item) => totalPrix + item.quantity * item.price, 0);

        function handleClose() {
            userProgress.hideCheckout();
        }

        function handleFinish() {
            userProgress.hideCheckout();
            cartCtx.clearCart();
            clearData();
        }

        // Handling the submit
        async function checkoutAction(prevState, fd) {
            //const fd = new FormData(event.target);
            const customData = Object.fromEntries(fd.entries()); 

            // Sending Data to the Backend

            await sendRequest(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer:customData
                }
            }));

        }
         
        //Managing Action with formActions
        const [formState, formAction, pending] = useActionState(checkoutAction, null);

        let actions = (
            <>
            <Button textOnly type="type" onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </>
        );

        if(pending) {
            actions = <span>Sending order data...</span>
        }

        if(data && !error) {
            return (
                <Modal open={userProgress.progress === 'checkout'} onClose={handleClose}>
                    <h2>Success!</h2>
                    <p>Your order was submitted successfully</p>
                    <p>We will get bact to you with more details via email within the next few minutes.</p>
                    <p className="modal-actions">
                        <Button onClick={handleFinish}>Okay</Button>
                    </p>
                </Modal>
            )
        }

    return <Modal open={userProgress.progress === 'checkout'} 
        onClose={handleClose}>
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartCtx)}</p>
            <Input label="full-name" type="text" id="name" />
            <Input label="Email Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code " type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            
            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}