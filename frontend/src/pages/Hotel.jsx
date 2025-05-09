import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Links, useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/store";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { MdLocationOn } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';


function Hotel() {
  const notify = () => toast.warn("you are not logged In");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { allData } = useContext(Context);
 
  const data = allData.find((d) => d._id == id);
  const { fetchdata } = useContext(Context);
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchdata();
        navigate("/");
      }else{
        notify();
      }
    } catch (error) {
  
      alert(error.message);// "You are not authorized"
    }
  };
const deleteReview = async (reviewID) => {
 const respose = await fetch(`/api/listing/${id}/review/${reviewID}`, {
    method: "DELETE"
  });
  if(respose.ok){
    fetchdata();
    navigate(`/hotel/${id}`)
  }else{
    notify();
  }
};

  return (
    <div className="flex flex-col justify-center mb-12 items-center">
       <ToastContainer />
      <div key={data?._id} className="mb-5">
        <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full h-[50vh] overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-t-lg"
              src={data?.image?.url || "/placeholder.png"}
              alt="product image"
            />
          </div>

          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                {data?.title}
              </h5>
            </a>
            <p className="font-light mt-4">{data?.description}</p>
            <div className="flex gap-4">
              <p className="font-bold mt-4 flex  justify-center items-center">
                <MdLocationOn />
                {data?.location}
              </p>

              <p className="font-bold mt-4">{data?.country}</p>
            </div>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <MdCurrencyRupee /> {data?.price}
              </span>
            </div>
           <span className="font-bold text-xl mt-5">{data?.owner?.username}</span>
            <div className="flex w-full  justify-end">
              <Link  to={`/listing/update/${id}`}>
                <Button text="Edit" />
              </Link>

              <Button text="Delete List" onClick={() => handleDelete(id)} />
            </div>
          </div>
        </div>
      </div>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(`/api/listing/${id}/review`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              review: {
                comment,
                rating,
              },
            }),
          });
         if(!response.ok){
          notify()
         }
          fetchdata();
        }}
      >
        <div className="w-[38vw] flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Leave Review</h1>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="text-2xl focus:outline-none"
                >
                  <FaStar
                    color={star <= (hover || rating) ? "#facc15" : "#e5e7eb"} // yellow-400 or gray-200
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">Selected Rating: {rating}</p>
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="font-medium">
              Comment
            </label>
            <textarea
            required
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              id="comment"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Type your message..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* review sections  */}
      <div className="mt-6 w-[38vw]">
        <h2 className="text-xl font-semibold mb-4">User Reviews</h2>

        {data?.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.reviews.map((review, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                {/* Star Rating */}
                 <p className="text-gray-800 font-bold uppercase">{review.author.username}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={18}
                        color={i < review?.rating ? "#facc15" : "#e5e7eb"} // yellow-400 or gray-200
                      />
                    ))}
                  </div>
                      
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="px-5 bg-black text-white rounded-sm py-1"
                  >
                    DELETE
                  </button>
                </div>

                {/* Comment */}
                <p className="text-gray-800">{review.comment}</p>
           

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotel;
