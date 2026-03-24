import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        breadCrumbLinks={[
          { title: "Home", link: "" },
          { title: "Products", link: "/dashboard" },
        ]}
      />
      <div className="flex-1 bg-blue-400">Home Page</div>
    </div>
  );
}
