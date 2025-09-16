import type { IListingData } from "@/type/listing_type";
import Api_confige from "./apiconfige";
import axios from "axios";
import axiosInstance from "@/utils/axios";
class API_ENDPOINTS {
  private createURL(endpoint: string) {
    return `${Api_confige.API_BASE_URL}${endpoint}`;
  }

  private async fetchData(url: string) {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  }

  public async getAllData(endpoint: string): Promise<IListingData[]> {
    const url = this.createURL(endpoint);
    return this.fetchData(url);
  }
  public async getDataById(
    endpoint: string,
    id: string
  ): Promise<IListingData> {
    const url = `${this.createURL(endpoint)}/${id}`;
    return this.fetchData(url);
  }

  public async createData(
    endpoint: string,
    data: FormData
  ): Promise<IListingData> {
    const url = await axiosInstance.post(this.createURL(endpoint), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return url.data;
  }

  public async deleteData(id: string) {
    const response = await axiosInstance.delete(
      this.createURL(`/listings/${id}`)
    );
    return response;
  }

  public async updateData(id: string, data: FormData): Promise<IListingData> {
    const url = this.createURL(`/listings/${id}`);
    const response = await axiosInstance.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async createReview(
    listingId: string,
    data: { rating: number; comment: string }
  ) {
    const url = this.createURL(`/listings/${listingId}/reviews`);
    const response = await axiosInstance.post(url, data);
    return response.data;
  }

  public async deleteReview(listingId: string, reviewId: string) {
    const url = this.createURL(`/listings/${listingId}/reviews/${reviewId}`);
    const response = await axiosInstance.delete(url);
    return response.data;
  }

  public async login(data: { email: string; password: string }) {
    const url = this.createURL("/auth/login");
    const response = await axios.post(url, data, { withCredentials: true });
    return response.data;
  }
  public async logout() {
    const url = this.createURL("/auth/logout");
    const response = await axiosInstance.post(url);
    return response.data;
  }

  public async getCoordinates(
    address: string
  ): Promise<{ lat: number; lng: number }> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=${
      import.meta.env.VITE_GEOCODING_API_KEY
    }`;
    const response = await this.fetchData(url);
    return response;
  }
}

const apiEndpoints = new API_ENDPOINTS();

export default apiEndpoints;
