export interface IOrder {
  id: string;
  transaction: {
    method: string;
  };
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  totalPrice: number;
  items: IOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
} 