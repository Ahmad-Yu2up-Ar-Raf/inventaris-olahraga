import { SidebarProvider } from '@/components/ui/fragments/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

// import Footer4Col from './site-footer';
// import NavbarDemo from './site-header';
// import SiteFooter from './site-footer';
import SiteHeader from './site-header';



interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <>
    <SiteHeader/>
      

            {children}

         
           {/* <SiteFooter/> */}
            
            </>;
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
