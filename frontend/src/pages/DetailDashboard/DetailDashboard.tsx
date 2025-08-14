import { useGetDataById } from "@/hooks/query";
import { useParams } from "react-router-dom"


function DetailDashboard() {
  const {id} = useParams<{id: string}>()
const { data, isLoading, error } = useGetDataById('/listings', id);
if (isLoading) return <div>Loading...</div>
if (error) return <div>Error loading data</div>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-4xl">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Detail Dashboard
    </h1>

    {data ? (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600 mb-4">{data.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-lg font-medium text-gray-800">
              💰 Price: <span className="text-green-600">${data.price}</span>
            </p>
            <p className="text-lg font-medium text-gray-800">
              📍 Location:{" "}
              <span className="text-blue-600">
                {data.location}, {data.country}
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
