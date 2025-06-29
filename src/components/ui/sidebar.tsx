
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarContextProps {
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

function SidebarProvider({
  children,
  initialCollapsed = false,
}: {
  children: React.ReactNode;
  initialCollapsed?: boolean;
}) {
  const [isCollapsed, setCollapsed] = React.useState(initialCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setCollapsed }}>
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva('flex h-full flex-col transition-all duration-300 ease-in-out', {
  variants: {
    collapsible: {
      icon: 'data-[collapsed=true]:w-16 w-64',
      responsive: 'data-[collapsed=true]:w-16 md:w-64 w-64',
    },
  },
  defaultVariants: {
    collapsible: 'responsive',
  },
});

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible, ...props }, ref) => {
    const { isCollapsed } = useSidebar();
    
    return (
      <div
        ref={ref}
        className={cn('group', sidebarVariants({ collapsible }), className)}
        data-collapsed={isCollapsed}
        {...props}
      />
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { isCollapsed, setCollapsed } = useSidebar();
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={() => setCollapsed(!isCollapsed)}
        {...props}
      >
        {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    );
  }
);
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('shrink-0', className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex-1 overflow-y-auto', className)} {...props} />;
  }
);
SidebarContent.displayName = 'SidebarContent';

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-1 p-2', className)} {...props} />;
  }
);
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

interface SidebarMenuButtonProps extends ButtonProps {
  isActive?: boolean;
  tooltip?: React.ComponentProps<typeof TooltipContent>;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild, isActive, tooltip, ...props }, ref) => {
    const { isCollapsed } = useSidebar();

    const button = (
      <Button
        ref={ref}
        variant="ghost"
        data-active={isActive}
        className={cn(
          'w-full justify-start',
          className
        )}
        asChild={asChild}
        {...props}
      />
    );

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="right" {...tooltip} />
        </Tooltip>
      );
    }
    
    return button;
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
};
