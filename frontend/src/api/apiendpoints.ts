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
}

const apiEndpoints = new API_ENDPOINTS();

export default apiEndpoints;