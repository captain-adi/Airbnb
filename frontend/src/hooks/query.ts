import apiEndpoints from '@/api/apiendpoints'
import {  useQuery } from '@tanstack/react-query'

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