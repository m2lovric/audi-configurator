export interface modelConfig {
  default?: {
    color: string;
    interior: string;
    wheels: string;
  };
  colors: { name: string; price: number }[];
  wheels: { name: string; price: number }[];
  interior: { name: string; price: number }[];
}
