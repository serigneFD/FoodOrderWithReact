import { createContext } from "react"

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout'
    showCart: () => {},
    hideCart:() => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});


export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }
}