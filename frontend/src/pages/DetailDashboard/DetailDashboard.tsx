import apiEndpoints from "@/api/apiendpoints";
import Review from "@/components/Review/Review";
import { Button } from "@/components/ui/button";
import UpdateListing from "@/components/UpdateListing/UpdateListing";
import { useGetDataById } from "@/hooks/query";
import DetailDashboardSkeleton from "@/skeletons/DetailDashboardSkeleton";
import { useNavigate, useParams } from "react-router-dom";

function DetailDashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDataById("/listings", id);
  const handleDelete = async () => {
    apiEndpoints.deleteData(id).then((response) => {
      if (response.status === 200) {
        navigate("/");
      }
    });
  };
  if (isLoading) return <DetailDashboardSkeleton />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="min-h-screen  flex flex-col items-center  p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center ">
          Detail Dashboard
        </h1>

        {data ? (
          <div className="dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {data.title}
              </h2>
              <p className="text-muted-foreground mb-4">{data.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-lg font-medium ">
                  💰 Price:{" "}
                  <span className="text-green-600">${data.price}</span>
                </p>
                <p className="text-lg font-medium  flex justify-between">
                  <span className="text-blue-600">
                    <span className="text-black dark:text-white
                    ">📍 Location: </span>
                    {data.location}, {data.country}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <UpdateListing data={data} />
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
          </div>
        )}
      </div>
      <Review id={id} />
    </div>
  );
}

export default DetailDashboard;
