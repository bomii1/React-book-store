import { useEffect, useState } from "react"
import { Cart } from "../models/cart.models"
import { deleteCart, fetchCart } from "../api/carts.api"

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState(true); // 기본 값이 빈 배열이기 때문

    const deleteCartItem = (id: number) => {
        deleteCart(id).then(() => {
            // 낙관적 업데이트
            setCarts(carts.filter((item) => id !== item.id));
        })
    }

    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        });
    }, []);

    return { carts, isEmpty, deleteCartItem };
}