import React, { useState, useEffect, useContext } from "react";
import ListsCard from "../components/ListsCard";
import { Context } from "../context/store";

function AllListing() {
 const {allData} = useContext(Context);
  return (
    <div className="m-auto w-[90%] grid grid-cols-4">
      {allData.map((data) => (
        <ListsCard data={data} />
      ))}
    </div>
  );
}

export default AllListing;
