import { fetchOrder, fetchOrders } from "../api/order.api";
import { OrderListItem } from "../models/order.models"
import { useEffect, useState } from "react"

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        // 처음 order 를 패치했을 때는 디테일 정보가 없음
        fetchOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);

    // 왜 이런 방식으로 디테일을 처리?
    // 이렇게 하지 않으면 자세히 버튼을 누를 때마다 데이터를 패치해야 하는데, 소모적인 방법
    // 그래서 필요할 때 패치해놔버림

    const selectOrderItem = (orderId: number) => {

        // 요청 방어
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            // console.log('orderDetail',orderDetail);
            // console.log('orderId', orderId);
            setSelectedItemId(orderId); // 자세히를 클릭한 주문 id
            // 자세히 버튼을 누르면 해당 주문에 대한 디테일 정보를 받아오고
            // 받아온 정보를 기존의 orders 를 순회하면서 해당하는 주문에 디테일 정보를 붙여줌
            setOrders(
                orders.map((item) => {
                    if (item.id === orderId) { // 주문 id 가 같다면, 디테일 정보 붙여서 돌려줌
                        return {
                            ...item,
                            detail: orderDetail,
                        };
                    }
                    return item;
                })
            );
        });
    };

    return { orders, selectedItemId, selectOrderItem };
}