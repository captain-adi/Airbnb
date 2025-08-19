import type { IListingData } from "@/type/listing_type";
import Api_confige from "./apiconfige";
import axios from "axios";
class API_ENDPOINTS  {
    private createURL(endpoint: string){
        return `${Api_confige.API_BASE_URL}${endpoint}`;
    }

    private async fetchData(url: string) {
        const response = await axios.get(url);
        if(response.status !== 200){
            throw new Error("Failed to fetch data");
        }
        return response.data;
    }

    public async getAllData(endpoint: string) : Promise<IListingData[]> {
        const url = this.createURL(endpoint);
        return this.fetchData(url);
    }
    public async getDataById(endpoint: string, id: string) : Promise<IListingData> {
        const url = `${this.createURL(endpoint)}/${id}`;
        return this.fetchData(url);
    } 
 
    public async createData(endpoint: string, data: IListingData) : Promise<IListingData> {
        const url = await axios.post(this.createURL(endpoint), data);
        return url.data;
    }

        public async deleteData(id: string){
            const response = await axios.delete(this.createURL(`/listings/${id}`));
            return response;
        }

    public async updateData(id: string, data: IListingData) : Promise<IListingData> {
        const url = this.createURL(`/listings/${id}`);
        const response = await axios.patch(url, data);
        return response.data;
    }


    public async createReview(id: string, data: { rating: number; comment: string }) {
        const url = this.createURL(`/listings/${id}/reviews`);
        const response = await axios.post(url, data);
        return response.data;
    }

}

const apiEndpoints = new API_ENDPOINTS();

export default apiEndpoints;