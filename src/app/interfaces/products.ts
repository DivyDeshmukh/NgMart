export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingInfo;
  quantity: number;
}

interface RatingInfo {
  rate: number;
  count: number;
}
