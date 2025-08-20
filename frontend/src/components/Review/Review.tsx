import { useCreateReview } from "@/hooks/query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IReview {
  id?: string;
}

function Review({ id }: IReview) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const { mutate } = useCreateReview();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ comment: string }>();

  const onSubmit = (data : any) => {
    mutate(
      { id, data: { rating, comment: data.comment } },
      {
        onSuccess: (response: any) => {
          console.log("Review submitted successfully:", response);
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again."
          );
        }
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Star Rating */}
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
                className="text-3xl"
                aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              >
                {starValue <= (hover ?? rating) ? "⭐" : "☆"}
              </button>
            );
          })}
        </div>

        {/* Comment Input */}
        <textarea
          {...register("comment", { required: "Comment is required" })}
          placeholder="Write your comment..."
          rows={6}
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
            errors.comment
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-green-400"
          }`}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          disabled={rating === 0}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;
