export interface Model {
  id?: string;
  model?: string;
  accessories: {
    color: { name: string; price: number };
    interior: { name: string; price: number };
    wheel: { name: string; price: number };
  };

  default: {
    color: { name: string; price: number };
    interior: { name: string; price: number };
    wheels: { name: string; price: number };
  };

  fullName?: string;
  price: number;
  year?: number;
  sideUrl?: string;
  createdAt?: string;
}
