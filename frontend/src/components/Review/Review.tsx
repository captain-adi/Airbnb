import { FlagIcon } from "lucide-react"
import type { IListingData } from "@/type/listing_type"

function Review({ data }: { data: IListingData["reviews"] }) {
  return (
    <div className="flex flex-col gap-6">
        {data?.length > 0 ? (
    data?.map((review) => ( 
      <div
        key={review._id}
        className="border border-gray-800 rounded-xl p-6 shadow-lg w-full"
      >
        {/* Top user info */}
        <div className="flex items-center gap-4">
          <img
            src={"https://i.pravatar.cc/50"}
            alt={review.username}
            className="w-12 h-12 rounded-full border border-gray-700"
          />
          <div>
            <h3 className="text-lg font-semibold ">
              {review.username || "Anonymous"}
            </h3>
          </div>
        </div>

        {/* Review title, stars & date */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={i < review.rating ? "gold" : "gray"}
                  className="w-5 h-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.176 3.62a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.243a1 1 0 00-.364 1.118l1.177 3.62c.3.921-.755 1.688-1.54 1.118l-3.085-2.243a1 1 0 00-1.176 0l-3.085 2.243c-.785.57-1.84-.197-1.54-1.118l1.177-3.62a1 1 0 00-.364-1.118L2.37 9.047c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.176-3.62z" />
                </svg>
              ))}
            </div>
            <span>
              {new Date(review.createdAt).toLocaleDateString()} at{" "}
              {new Date(review.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Comment */}
        <p className=" mt-3 leading-relaxed text-muted-foreground">{review.comment}</p>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <button disabled className="px-3 py-1 text-sm text-muted-foreground  hover:text-red-400">
            Report <FlagIcon className="inline-block w-4 h-4" />
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400">No reviews yet. Be the first to review!</p>
  )}
    </div>
  )
}

export default Review

