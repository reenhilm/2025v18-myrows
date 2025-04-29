export interface Receipt {
    id: string;
    retailer_name: string;
    title: string;
    description: string;
    price_total: number;
    image_url: string;
    date: ReceiptDates;
    category: Category;
    uploader: Uploader;
}

export interface ReceiptDates {
    purchased: string;
    uploaded: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Uploader {
    id: string;
    fullname: string;
}