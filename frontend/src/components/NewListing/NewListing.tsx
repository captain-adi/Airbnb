import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { IListingData } from "@/type/listing_type";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useCreateData } from "@/hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function NewListing() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IListingData>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useCreateData();

  const onSubmit = (data: IListingData) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getAllData", "/listings"],
        });
        reset();
        setOpen(false);
        navigate("/");
        toast("Listing created successfully");
      },
      onError: (error: any) => {
        toast(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again."
        );
      },
    });
  };

  return (
    <>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Listing</Button>
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
            onSubmit={handleSubmit(onSubmit)}
            className=" p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
          >
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Listing Title"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.title
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}

            <textarea
              {...register("description", {required : "Description is required"})}
              cols={30}
              placeholder="Listing Description"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.description
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            />
            <input
              {...register("price", {
                valueAsNumber: true,
                required: "Price is required",
              })}
              type="number"
              placeholder="Listing Price"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.price
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Listing Location"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.location
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
            <input
              {...register("image")}
              type="file"
              placeholder="upload image"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.image
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            /> 

            <input
              {...register("country", { required: "country is required" })}
              type="text"
              placeholder="Listing Country"
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition ${
                errors.country
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
            />
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Create Listing
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default NewListing;
