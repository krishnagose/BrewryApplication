import { ReactNode } from "react";
import Footer from "@/containers/Footer/page";
import Navbar from "@/containers/Navbar/page";
import { Brewery } from "./containers/Maincontent/page";
// import Image from "next/image";

interface Props {
  children: ReactNode;
  filterData: (name: string) => Brewery[];
}

const MainTemplate: React.FC<Props> = ({ children, filterData }) => {
  return (
    <main className="flex flex-col items-start justify-start w-full overflow-auto">
      <div className="w-full">
        <Navbar filterData={filterData} />
        <div style={{ marginTop: "64px" }}>{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default MainTemplate;
