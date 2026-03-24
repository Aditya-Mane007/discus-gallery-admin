import React from "react";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Header({
  breadCrumbLinks,
}: {
  breadCrumbLinks: { title: string; link: string }[];
}) {
  return (
    <header className="sticky top-0 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto "
        />
        <Breadcrumb>
          <BreadcrumbList>
            {(breadCrumbLinks || []).map((breadCrumb, index) => (
              <div key={index} className="flex items-center justify-center">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href={breadCrumb?.link}
                    className="font-medium"
                  >
                    {breadCrumb?.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadCrumbLinks?.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:flex ml-1 items-center" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
export default Header;
