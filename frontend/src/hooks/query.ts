import apiEndpoints from '@/api/apiendpoints'
import type { IListingData } from '@/type/listing_type';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllData(endpoint : string) {
return useQuery({
    queryKey : ['getAllData', endpoint],
    queryFn : ()=> apiEndpoints.getAllData(endpoint),
})
}

export function useGetDataById(endpoint : string, id : string) {
    return useQuery({
        queryKey : ['getDataById', endpoint, id],
        queryFn : ()=> {
            if (!id) {
                throw new Error('ID is required to fetch data by ID');
            }
            return apiEndpoints.getDataById(endpoint, id);
        }
    })
}


export function useCreateData() {
    return useMutation({
        mutationKey: ['createData'],
        mutationFn: async (data: IListingData) => {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price.toString());
            formData.append("location", data.location);
            formData.append("country", data.country);

            // Wait for coordinates before submitting
            const coords = await apiEndpoints.getCoordinates(data.location);
            if (coords && typeof coords.lat === 'number' && typeof coords.lng === 'number') {
                const lat = coords.lat;
                const lng = coords.lng;
                formData.append("geoLocation", JSON.stringify({
                    type: "Point",
                    coordinates: [lng, lat] // GeoJSON: [longitude, latitude]
                }));
            }

            return apiEndpoints.createData('/listings', formData);
        }
    });
}


export function useDeleteData() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteData'],
        mutationFn: (id:string) => apiEndpoints.deleteData(id),
            onSuccess: (_, id) => {
      // Invalidate listing caches so data refreshes
      queryClient.invalidateQueries({ queryKey: ["/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/listing", id] });
    },
    })
} 


export function useUpdateData(){
    return useMutation({
        mutationKey: ['updateData'],
        mutationFn: ({ id, data }: { id: string; data: IListingData }) => {
            const formData = new FormData();

            // If a new file is selected, use it. Otherwise, send the existing image URL.
            if (data.image && typeof data.image !== "string" && data.image[0]) {
                formData.append("image", data.image[0]);
            } else if (typeof data.image === "string") {
                formData.append("image", data.image); // send the URL as a string
            }

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price.toString());
            formData.append("location", data.location);
            formData.append("country", data.country);

            return apiEndpoints.updateData(id, formData);
        }
    })
}

export function useCreateReview() {
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: ({ listingId, data }: { listingId: string; data: { rating: number; comment: string } }) => apiEndpoints.createReview(listingId, data),
    })
}

export function useDeleteReview() {
    return useMutation({
        mutationKey: ['deleteReview'],
        mutationFn: ({ listingId, reviewId }: { listingId: string; reviewId: string }) => apiEndpoints.deleteReview(listingId, reviewId),
    })
}

export function useLogin() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: { email: string; password: string }) => apiEndpoints.login(data),
    })
}

export function useLogout(){
   return useMutation(
        {
            mutationKey: ['logout'],
            mutationFn: () => apiEndpoints.logout(),
        }
    )
}