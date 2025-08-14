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

function NewListing() {
  const { register, handleSubmit, reset } = useForm<IListingData>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useCreateData();

  const onSubmit = (data: IListingData) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getAllData', '/listings'] });
        reset();
        setOpen(false);
        navigate("/");
      },
    });
  };

  return (
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
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
          >
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
  );
}

export default NewListing;
