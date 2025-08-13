import apiEndpoints from "@/api/apiendpoints";
import type { IListingData } from "@/type/listing_type";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function DetailDashboard() {
  const [listing, setListing] = useState<IListingData>();
  console.log(listing);
  const {id} = useParams();
  useEffect(()=>{
    if (id) {
      apiEndpoints.getDataById('/listings', id).then((data)=>setListing(data)).catch((error)=>console.error(error));
    }
  },[id])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-4xl">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Detail Dashboard
    </h1>

    {listing ? (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {listing.title}
          </h2>
          <p className="text-gray-600 mb-4">{listing.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-lg font-medium text-gray-800">
              💰 Price: <span className="text-green-600">${listing.price}</span>
            </p>
            <p className="text-lg font-medium text-gray-800">
              📍 Location:{" "}
              <span className="text-blue-600">
                {listing.location}, {listing.country}
              </span>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    )}
  </div>
</div>

  )
}

export default DetailDashboard
