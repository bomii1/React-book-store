import { request } from "http";
import { Order, OrderDetailItem, OrderSheet } from "../models/order.models";
import { httpClient, requestHandler } from "./http";

// export const order = async (orderDate: OrderSheet) => {
//     const response = await httpClient.post('/orders', orderDate);

//     return response.data;
// }

export const order = async (orderData: OrderSheet) => {
    return await requestHandler<OrderSheet>("post", "/orders", orderData);
}

// export const fetchOrders = async () => {
//     const response = await httpClient.get<Order[]>('/orders');

//     return response.data;
// }

export const fetchOrders = async () => {
    return await requestHandler<Order[]>('get', 'orders');
}

// export const fetchOrder = async (orderId: number) => {
//     const response = await httpClient.get<OrderDetailItem[]>(`/orders/${orderId}`);

//     return response.data;
// }

export const fetchOrder = async (orderId: number) => {
    return await requestHandler('get', `/orders/${orderId}`);
}