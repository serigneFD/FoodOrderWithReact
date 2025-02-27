
import { useContext } from 'react';

import {currencyFormatter} from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CarContext from '../store/CartContext.jsx';


export default function MealItem({meal}) {

    // Calling the Cart Contex
    const cartCtx = useContext(CarContext);

    function handleMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img  src={`http://localhost:3000/${meal.image}`} alt="my imgae for each food we have"/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleMealToCart}> Add to Cart</Button>
                </p>
            </article>

        </li>
    )
}