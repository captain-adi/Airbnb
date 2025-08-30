import apiEndpoints from "@/api/apiendpoints";
import Map from "@/components/Map/Map";
import Review from "@/components/Review/Review";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UpdateListing from "@/components/UpdateListing/UpdateListing";
import { useAuth } from "@/context/AuthContext";
import { useGetDataById } from "@/hooks/query";
import DetailDashboardSkeleton from "@/skeletons/DetailDashboardSkeleton";
import { useNavigate, useParams } from "react-router-dom";

function DetailDashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDataById("/listings", id ?? "");
  const { user } = useAuth();
  console.log(data?.owner._id, user?._id);
  const handleDelete = async () => {
    if (!id) return;
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
              <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
              <p className="text-muted-foreground mb-4">{data.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-lg font-medium ">
                  💰 Price:{" "}
                  <span className="text-green-600">${data.price}</span>
                </p>
                <p className="text-lg font-medium  flex justify-between">
                  <span className="text-blue-600">
                    <span
                      className="text-black dark:text-white
                    "
                    >
                      📍 Location:{" "}
                    </span>
                    {data.location}, {data.country}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                {
                  user?._id === data?.owner?._id && <UpdateListing data={data}  />
                }
                {
                  user?._id === data?.owner?._id &&   <Button
                  onClick={handleDelete}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
                }
              
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
          </div>
        )}
      </div>
      <div className="max-w-4xl w-full mx-auto mt-6 space-y-6">
       <Card className="w-full" >
  <CardContent className="flex items-center gap-4 p-4">
    {/* Avatar / Image */}
    <div className="w-14 h-14 text-black rounded-full bg-gray-400 flex items-center justify-center text-lg font-semibold  dark:bg-gray-200 ">
 
        <span>{data?.owner?.username?.[0]?.toUpperCase() || "?"}</span>
     
    </div>

    {/* Details */}
    <div>
      <p className="capitalize font-medium text-lg">
        Hosted by: {data?.owner?.username}
      </p>
      <p className="text-sm text-muted-foreground">
        Joined {new Date(data?.owner?.createdAt ?? "").toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </p>
    </div>
  </CardContent>
</Card>
<Map coordinates={data?.geoLocation?.coordinates ? [data.geoLocation.coordinates[1], data.geoLocation.coordinates[0]] : [28.6139, 77.209]} />

      </div>
      <ReviewForm id={id} />
      <div className="max-w-4xl w-full mx-auto mt-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6 ">
          Customer Reviews ({data?.reviews.length || 0})
        </h1>

        <Review data={data?.reviews || []} listingId={id ?? ""} />
      </div>
    </div>
  );
}

export default DetailDashboard;
