"use client";
import { ReactNode, useState } from "react";
import Footer from "@/containers/Footer/page";
import Navbar from "@/containers/Navbar/page";
import Image from "next/image";
import MainTemplate from "@/template";
import Breweries, { Brewery } from "@/containers/Maincontent/page";

interface Props {
  children: ReactNode;
}

const Mainrender: React.FC<Props> = ({ children }) => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const filterData = (name: string) => {
    console.log(name);
    const filteredData = breweries.filter((brewerie) => {
      return (
        brewerie.name.toLowerCase().includes(name.toLowerCase()) ||
        brewerie.city.toLowerCase().includes(name.toLowerCase()) ||
        brewerie.brewery_type.toLowerCase().includes(name.toLowerCase())
      );
    });
    console.log(filteredData, "data");
    setBreweries(filteredData);
    return filteredData;
  };
  return (
    <MainTemplate
      children={
        <>
          <Breweries setBreweries={setBreweries} breweries={breweries} />
        </>
      }
      filterData={filterData}
    />
  );
};

export default Mainrender;
