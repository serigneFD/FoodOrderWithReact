import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
export default function Meals () {
    const [loadingMeals, setLoadingMeals] = useState([]);
    
    // Fetching the data 

    useEffect(() =>{
        async function fecthMeals() {
            const response = await fetch('http://localhost:3000/meals');
    
            if(!response.ok) {
    
            }
            const meals = await response.json();
            setLoadingMeals(meals);
        }

        fecthMeals();
    },[])
    
    
    
    return (
        <ul id="meals">
          {loadingMeals.map((meal) => (<MealItem key={meal.id} meal={meal}/>))}
        </ul>
    )
}