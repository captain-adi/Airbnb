import apiEndpoints from "@/api/apiendpoints"
import type { IListingData } from "@/type/listing_type";
import { useEffect, useState } from "react"


function Dashboard() {
  const [listings,setListings]= useState<IListingData[]>([]);
console.log(listings)
  useEffect(()=>{
    apiEndpoints.getData('/testing').then((data)=>setListings(data)).catch((error)=>console.error(error));
  },[])
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {listings.map((listing) => (
      <div
        key={listing.id}
        className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300"
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full transform hover:scale-105 transition duration-500 ease-in-out"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{listing.title}</h2>
          <p className="text-muted-foreground mt-2">{listing.description}</p>

          <p className="mt-3 text-lg font-bold text-indigo-600">
            ${listing.price}
          </p>
          <p className="text-gray-500 text-sm">
            {listing.location}, {listing.country}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Dashboard
