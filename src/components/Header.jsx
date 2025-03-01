import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CarContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {

   const cartCtx = useContext(CarContext);
   const userProgressCtx = useContext(UserProgressContext);

   const totalItemsQuantity = cartCtx.items.reduce((totalNumbersOfItems, item) => {
        return totalNumbersOfItems + item.quantity;
   }, 0);

   function handleShowCart() {
    userProgressCtx.showCart();
   }

    return (
        <header id='main-header'>
            <div id='title'>
            <img src={logoImg} alt='logo food app'/>
            <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly={true}
                onClick={handleShowCart}>Cart {totalItemsQuantity}</Button>
            </nav>
        </header>
    )
}