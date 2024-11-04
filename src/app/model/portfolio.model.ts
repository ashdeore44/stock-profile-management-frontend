
export interface Stock {
    ticker: string;
    quantity: number;
    price: number;
    totalValue: number;
}

export interface Portfolio {
    portfolioId: number | null;
    userName: string;
    stocks: Stock[];
}
