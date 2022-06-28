export interface CarI {
  data: {
    id: string;
    image: string;
    model: string;
    production_year: number;
  };
}

export interface modelI {
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

export interface modelIdI {
  id: string;
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
  year: number;
  sideUrl: string;
  createdAt: string;
}

export interface modelConfigI {
  default?: {
    color: string;
    interior: string;
    wheels: string;
  };
  colors: { name: string; price: number }[];
  wheels: { name: string; price: number }[];
  interior: { name: string; price: number }[];
}
