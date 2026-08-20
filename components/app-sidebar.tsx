'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Users,
  UsersRound,
  KeyRound,
  ShieldUser,
  FileKey,
  Building2,
  Mail,
  History,
  ChevronRightIcon,
} from 'lucide-react';
import useGetPermissionQuery from '@/hooks/useGetPermissionQuery';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

export function NavMainSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Skeleton className="w-full h-12" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Skeleton className="w-[95%] h-8 ml-auto" />
          <SidebarMenu className="mt-2">
            <>
              <Skeleton className="w-[95%] ml-auto h-8" />

              <Collapsible
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild></CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <Skeleton className="w-full h-9 my-1" />
                      <Skeleton className="w-full h-9 my-1" />
                      <Skeleton className="w-full h-9 my-1" />
                      <Skeleton className="w-full h-9 my-1" />
                      <Skeleton className="w-full h-9 my-1" />
                      <Skeleton className="w-full h-9 my-1" />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <Skeleton className=" h-8 w-[95%] ml-auto" />
          <SidebarMenu className="mt-2">
            <>
              <Skeleton className="w-[95%] ml-auto h-8 mt-[0.35rem]" />
              <Skeleton className="w-[95%] ml-auto h-8 mt-[0.35rem]" />
              <Skeleton className="w-[95%] ml-auto h-8 mt-[0.35rem]" />
            </>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Skeleton className="w-[95%] ml-auto h-12" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { permissions, isPending } = useGetPermissionQuery();
  // const {organizations} =

  const [permissionsData, setPermissionsData] = React.useState<
    Record<string, unknown>
  >({});

  const data = React.useMemo(
    () => ({
      user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
      },
      teams: [
        {
          name: 'Acme Inc',
          logo: <GalleryVerticalEndIcon />,
          plan: 'Enterprise',
        },
        {
          name: 'Acme Corp.',
          logo: <AudioLinesIcon />,
          plan: 'Startup',
        },
        {
          name: 'Evil Corp.',
          logo: <TerminalIcon />,
          plan: 'Free',
        },
      ],
      navMain: [
        {
          title: 'IAM',
          url: '/iam',
          icon: <TerminalSquareIcon />,
          isActive: false,
          groupLabel: 'Identity and Access Management',
          items: [
            {
              title: 'Users',
              url: '/iam/users',
              permission: permissionsData['user:read'],
              icon: <Users />,
            },
            {
              title: 'User Groups',
              url: '/iam/user-groups',
              permission: permissionsData['user-group:read'],
              icon: <UsersRound />,
            },
            {
              title: 'Roles',
              url: '/iam/roles',
              permission: permissionsData['role:read'],
              icon: <KeyRound />,
            },
            {
              title: 'Role Groups',
              url: '/iam/role-groups',
              permission: permissionsData['role-group:read'],
              icon: <ShieldUser />,
            },
            {
              title: 'Policies',
              url: '/iam/policies',
              permission: permissionsData['policy:read'],
              icon: <FileKey />,
            },
            {
              title: 'Organizations',
              url: '/iam/organizations',
              permission: permissionsData['organization:read'],
              icon: <Building2 />,
            },
            {
              title: 'Memberships',
              url: '/iam/memberships',
              permission: permissionsData['membership:read'],
              icon: <Users />,
            },
            {
              title: 'Invitations',
              url: '/iam/invitations',
              permission: permissionsData['invitation:read'],
              icon: <Mail />,
            },
            {
              title: 'Sessions',
              url: '/iam/sessions',
              permission: permissionsData['session:read'],
              icon: <History />,
            },
          ],
        },
      ],
    }),
    [permissionsData],
  );

  React.useEffect(() => {
    setPermissionsData({ ...permissions?.policy_document?.permissions });
  }, [permissions]);

  if (isPending) {
    return <NavMainSkeleton />;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain as any} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
