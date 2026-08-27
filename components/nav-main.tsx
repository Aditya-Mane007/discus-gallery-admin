'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function NavMain({
  items,
  permissionsData,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    permission?: boolean;
    groupLabel?: string;
    items?: {
      title: string;
      url: string;
      icon: React.ReactNode;
      permission?: boolean;
    }[];
  }[];
  permissionsData: {
    [key: string]: boolean;
  };
}) {
  console.log(
    'PERMISSION DATA :',
    permissionsData.hasOwnProperty('invitation:cancel'),
  );
  return (
    <>
      {items.map((item) => (
        <SidebarGroup key={item?.title}>
          {(item?.requiredPermissions || []).filter((key) =>
            permissionsData.hasOwnProperty(key),
          ).length > 1 && (
            <>
              <SidebarGroupLabel className="truncate">
                {item?.groupLabel}
              </SidebarGroupLabel>
              <SidebarMenu>
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          return (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className={cn(subItem?.permission && 'none')}
                            >
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  {subItem.icon}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </>
          )}
        </SidebarGroup>
      ))}
    </>
  );
}
