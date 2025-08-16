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


export function useCreateData( ) {
    return useMutation({
        mutationKey: ['createData'],
        mutationFn: (data : IListingData) => apiEndpoints.createData('/listings', data),
    })
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
        mutationFn: ({ id, data }: { id: string; data: IListingData }) => apiEndpoints.updateData(id, data),
    })
}