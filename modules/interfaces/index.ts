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
    color: string;
    interior: string;
    wheel: string;
  };
  price: number;
}

export interface modelConfigI {
  default: {
    color: string;
    interior: string;
    wheels: string;
  };
  colors: string[];
  wheels: string[];
  interior: string[];
}
