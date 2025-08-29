import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { IListingData } from "@/type/listing_type";
import { useUpdateData } from "@/hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IUpdateListingProps {
  data: IListingData;
}

function UpdateListing({ data }: IUpdateListingProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IListingData>();
  const { mutate, isPending } = useUpdateData();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);
  // const  lowQualityImage = data.image.replace("upload/", "upload/h_250,w_300/");
  useEffect(() => {
    if (open) {
      reset({
        title: data.title,
        description: data.description,
        price: data.price,
        country: data.country,
        location: data.location,
      });
    }
  }, [open]);

  const onSubmit = (formData: IListingData) => {
    mutate(
      { id: data?._id, data: formData },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({
            queryKey: ["getDataById", "/listings"],
          });
          setOpen(false);
          toast.success("Listing updated successfully!");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Listing</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Create New Listing</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill in the details below to create a new listing.
        </DialogDescription>
        <div className="flex justify-center items-center">
          <form
            className=" p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              disabled={isPending}
              placeholder="Listing Title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              cols={30}
              disabled={isPending}
              placeholder="Listing Description"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />

            <input
              {...register("price", {
                valueAsNumber: true,
                required: "Price is required",
              })}
              type="number"
              disabled={isPending}
              placeholder="Listing Price"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.price
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />

            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              disabled={isPending}
              placeholder="Listing Location"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.location
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />
            {/* {
              data.image &&  <img src={lowQualityImage} alt="Preview" className="mt-2" />
            } */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>

              <div className="flex justify-center items-center w-full overflow-hidden">
                <label
                  className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition 
          ${
            errors.image
              ? "border-red-500 bg-red-50 hover:bg-red-100"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          } hover:scale-[1.01] shadow-sm`}
                >
                  {preview || data.image ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={preview || data.image}
                        alt="Uploaded Preview"
                        className="h-full w-full object-contain rounded-xl p-2"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center rounded-xl transition">
                        <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                          Change Image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <svg
                        className="w-14 h-14 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-1 text-sm text-gray-600">
                        <span className="font-semibold text-blue-600">
                          Click to upload
                        </span>{" "}
                        or drag & drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, JPEG (max. 5MB)
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    disabled={isPending}
                    className="hidden"
                    {...register("image", {
                      onChange: (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      },
                    })}
                  />
                </label>
              </div>

              {errors.image && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              disabled={isPending}
              placeholder="Listing Country"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.country
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />
            {isPending ? (
              <Button disabled>Updating...</Button>
            ) : (
              <Button type="submit" className="py-6 px-6 cursor-pointer">
                Update Listing
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateListing;
