
'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '../logo';
import { LayoutDashboard, Swords, Trophy, Gift } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/rewards', label: 'Rewards', icon: Gift },
  { href: '/play', label: 'Play', icon: Swords },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-primary text-primary-foreground" collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="group-data-[collapsed=true]:hidden">
            <Logo />
          </div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                    className="group-data-[collapsed=true]:justify-center data-[active=true]:bg-primary-foreground/10 data-[active=true]:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsed=true]:hidden">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
