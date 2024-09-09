interface Rating {
    rate: number;
    count: number;
}

export interface IProductCardProp {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: Rating;
    title: string;
    quant?: number;
}