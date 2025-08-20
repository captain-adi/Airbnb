import { useGetAllData } from "@/hooks/query";
import DashboardSkeleton from "@/skeletons/DashboardSkeleton";
import type { IListingData } from "@/type/listing_type";
import { Link } from "react-router-dom";


function Dashboard() {
const { data ,  isLoading, error } = useGetAllData('/listings'); 
if (isLoading) return <DashboardSkeleton/>
if (error) return <div>Error loading data</div>

  return (
    <div className="p-8  min-h-screen">
  <h1 className="text-3xl font-bold  mb-8">Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {data?.map((listing  : IListingData) => (
      <Link to={`/rooms/${listing._id}`}    key={listing._id}>
        <div
       
          className="dark:bg-gray-900 shadow-md rounded-xl overflow-hidden border  hover:shadow-lg transition duration-300"
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
          <h2 className="text-xl font-semibold">{listing.title}</h2>
          <p className="text-muted-foreground mt-2">{listing.description}</p>

          <p className="mt-3 text-lg font-bold text-indigo-600">
            ${listing.price}
          </p>
          <p className="text-muted-foreground text-sm">
            {listing.location}, {listing.country}
          </p>
        </div>
      </div>
         </Link>
    ))}
  </div>
</div>

  ) 
}

export default Dashboard
