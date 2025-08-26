export interface IListingData {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    country: string;
    location: string;
    reviews: { _id: string; rating: number; comment: string; createdAt: Date; updatedAt: Date; username? : string}[];
    owner : {
        _id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
}