export interface CarI {
  data: {
    id: string;
    image: string;
    model: string;
    production_year: number;
  };
}

export interface modelConfigI {
  colors: string[];
  wheels: string[];
  interior: string[];
}
