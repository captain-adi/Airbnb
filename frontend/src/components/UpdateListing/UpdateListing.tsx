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


interface IUpdateListingProps {
  data: IListingData;
}

function UpdateListing({ data }: IUpdateListingProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<IListingData>();
  const { mutate } = useUpdateData();
  const queryClient = useQueryClient();

  useEffect(()=>{
    if(open) {
      reset({ title: data.title, description: data.description, price: data.price, image: data.image, country: data.country, location: data.location });
    }
  },[open])

  const onSubmit = (formData: IListingData) => {
    mutate({ id: data?._id, data: formData }, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["getDataById", "/listings"] });
        setOpen(false);
      },
    });
  }

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
          <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("title")}
              type="text"
              placeholder="Listing Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              {...register("description")}
              cols={30}
              placeholder="Listing Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Listing Price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              {...register("location")}
              type="text"
              placeholder="Listing Location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("image")}
              type="text"
              placeholder="Listing Image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("country")}
              type="text"
              placeholder="Listing Country"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <Button
              type="submit"
              className="py-6 px-6 cursor-pointer"
            >
              Update Listing
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateListing;
