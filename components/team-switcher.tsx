'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import useMutationHook from '@/hooks/useMutationHook';
import { changeOrganization } from '@/lib/services/organizationService';
import { useRouter } from 'next/navigation';

export function TeamSwitcher({
  teams,
  currentSelectedMembeship,
}: {
  teams: {
    name: string;
    logo: string;
    plan: string;
    organization_membership_id: string;
  }[];
  activeTeam: string;
}) {
  console.log('TEAMS : ', teams);
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  // console.log(activeTeam);

  React.useEffect(() => {
    if (teams) {
      setActiveTeam(
        (teams || []).filter(
          (team) =>
            team?.organization_membership_id == currentSelectedMembeship,
        )[0],
      );
    }
  }, [teams, currentSelectedMembeship]);

  const router = useRouter();

  const { mutate, isPending } = useMutationHook(
    changeOrganization,
    ['user-info', 'user-permission'],
    () => {
      router.refresh(); // forces middleware to re-run on current route
    },
  );

  const changeUserOrganization = (membeshipId: String) => {
    const formData = {
      membership_id: membeshipId,
    };
    mutate(formData);
  };

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image
                  src={activeTeam?.logo}
                  alt={activeTeam?.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {isPending ? (
              <p>Switching...</p>
            ) : (
              <>
                {teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    disabled={
                      team?.organization_membership_id ==
                      currentSelectedMembeship
                    }
                    onClick={() => {
                      setActiveTeam(team);
                      changeUserOrganization(team?.organization_membership_id);
                    }}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <Image
                        src={activeTeam?.logo}
                        alt={activeTeam?.name}
                        width={20}
                        height={20}
                      />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut className="flex ">
                      {/* ⌘{index + 1} */}
                      {team?.organization_membership_id ==
                        currentSelectedMembeship && <Badge>Active</Badge>}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <PlusIcon className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
