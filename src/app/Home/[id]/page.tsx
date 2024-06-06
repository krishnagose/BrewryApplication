"use client";
import { Brewery } from "@/containers/Maincontent/page";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DataObject {
  [key: string]: any;
}

const Myid = () => {
  const searchparams = useParams();
  console.log(searchparams.id, "myid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [singledata, setSingledata] = useState<DataObject>({});
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await axios.get<Brewery>(
          `https://api.openbrewerydb.org/v1/breweries/${searchparams.id}`
        );
        console.log(response.data);
        setSingledata(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="p-5">
      <div className=" border border-gray-300 rounded-md w-1/2 p-3">
        <div className="text-2xl border-b-[0.5px] bg-gray-400 rounded-md">
          Single bewery data
        </div>
        <div className="p-2">
          {Object.keys(singledata).map((key) => {
            return (
              <div className="flex flex-row justify-between p-1">
                <div>{key}</div>
                <div>
                  <p>{singledata[key]}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="gap-4 flex flex-col">
          <input
            type="Discription"
            id="Discription"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your Discription"
            required
            // value={Discriptionvalue}
            // onChange={onDiscriptionchange}
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myid;
