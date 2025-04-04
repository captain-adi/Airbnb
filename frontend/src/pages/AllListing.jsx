import React, { useState, useEffect, useContext } from "react";
import ListsCard from "../components/ListsCard";
import { Context } from "../context/store";

function AllListing() {
 const {allData} = useContext(Context);
 console.log(allData)
  return (
    <div className="m-auto w-[90%] grid grid-cols-4">
      {allData.length != 0 ?  allData.map((data) => (<ListsCard data={data} /> )) : <h1>no data found</h1>}
    </div>
  );
}

export default AllListing;
