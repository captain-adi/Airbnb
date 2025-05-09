import React, { useState, useEffect, useContext } from "react";
import ListsCard from "../components/ListsCard";
import { Context } from "../context/store";


function AllListing() {


 const {allData} = useContext(Context);

  return (
    <div className="m-auto w-[90%] grid grid-cols-4">
      {allData.length != 0 ?  allData.map((data) => (<ListsCard key={data._id} data={data} /> )) : <h1>no data found</h1>}
    </div>
  );
}

export default AllListing;
