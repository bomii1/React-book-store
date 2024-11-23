export interface Order {
    id: number;
    createdAt: string;
    address: string;
    receiver: string;
    contact: string;
    book_title: string;
    total_quantity: number;
    total_price: number;
}

export interface OrderSheet {
    items: number[];
    totalQuantity: number;
    totalPrice: number;
    firstBookTitle: string;
    delivery: Delivery;
}

export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

export interface OrderDetailItem {
    book_id: number;
    book_title: string;
    author: string;
    price: number;
    quantity: number;
}

export interface OrderListItem extends Order {
    detail?: OrderDetailItem[]; // 처음 패치하면 디테일 정보가 없을 수도 있기 때문에 옵셔널
}