"use client";
import Header from "@/components/Header";
import useAuthQuery from "@/hooks/useAuthQuery";

export default function Home() {
  const { user } = useAuthQuery();

  // console.log(user);
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        breadCrumbLinks={[
          { title: "Home", link: "" },
          { title: "Products", link: "/dashboard" },
        ]}
      />
    </div>
  );
}
