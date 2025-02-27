import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CarContext from '../store/CartContext.jsx';
import { useContext } from 'react';

export default function Header() {

   const cartCtx = useContext(CarContext);
   const totalItemsQuantity = cartCtx.items.reduce((totalNumbersOfItems, item) => {
        return totalNumbersOfItems + item.quantity;
   }, 0);

    return (
        <header id='main-header'>
            <div id='title'>
            <img src={logoImg} alt='logo food app'/>
            <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly={true}>Cart {totalItemsQuantity}</Button>
            </nav>
        </header>
    )
}