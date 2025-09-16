import { SidebarProvider } from '@/components/ui/fragments/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

// import Footer4Col from './site-footer';
// import NavbarDemo from './site-header';
// import SiteFooter from './site-footer';
import {SiteHeader }from './site-header';
import StickyFooter from './site-footer';
import Noise from '../../fragments/Noise';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';



interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;
  const paths = usePage().url
  const isAuthPage = paths !== '/register' &&  paths !== '/login'
    if (variant === 'header'    ) {
        return (

     <main className={cn("bg-background text-foreground " , isAuthPage && 'container')}>
      {/* Main Content */}
      
{isAuthPage ? (
<>
<div className=" min-h-dvh  relative py-5     overflow-hidden   items-center justify-center bg-gradient-to-br from-background via-muted to-background ">
        <div className="  relative px-3 lg:px-10 m-auto w-full">
          <SiteHeader paths={paths}/>
          {/* {paths != '/' && (


          )} */}
      {children}
        </div>
     
  <Noise
    patternSize={50}
    patternScaleX={1}
    patternScaleY={1}
    patternRefreshInterval={2}
    patternAlpha={15}
  />

    
      </div>
<StickyFooter />
</>
) : (
  children
)}
    </main>
        )
    }
    
    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
