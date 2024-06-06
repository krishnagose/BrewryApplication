"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import Link from "next/link";

export interface Brewery {
  id: string;
  name: string;
  city: string;
  state: string;
  brewery_type: string;
  address_1: string;
  website_url: string;
  phone: number;
}

const Breweries: React.FC<{
  setBreweries: Dispatch<SetStateAction<Brewery[]>>;
  breweries: Brewery[];
}> = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await axios.get<Brewery[]>(
          "https://api.openbrewerydb.org/v1/breweries"
        );
        props.setBreweries(response.data);
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

  const handlePress = (item: Brewery) => {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Breweries List</h1>
      <div className="grid grid-cols-2 gap-2 p-8">
        {props.breweries.map((brewery) => (
          <Link href={`Home/${brewery?.id}`}>
            <div
              key={brewery.id}
              className="mb-2"
              onClick={() => handlePress(brewery)}
            >
              <div className="flex flex-row justify-center gap-8 p-2  border-[0.5px] border-gray-500 rounded-lg">
                <div className="flex flex-col">
                  <div>
                    <text>Brewery Name </text>
                  </div>
                  <div>
                    <text>Brewery Type </text>
                  </div>
                  <div>
                    <text>Brewery Address </text>
                  </div>
                  <div>
                    <text>Phone Number </text>
                  </div>
                  <div>
                    <text>Website Url </text>
                  </div>
                  <div>
                    <text>State </text>
                  </div>
                  <div>
                    <text>City </text>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div>
                    <text>: </text>
                    <text>{brewery.name}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.brewery_type}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.address_1}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.phone}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.website_url}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.state}</text>
                  </div>
                  <div>
                    <text>: </text>
                    <text>{brewery.city}</text>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Breweries;
