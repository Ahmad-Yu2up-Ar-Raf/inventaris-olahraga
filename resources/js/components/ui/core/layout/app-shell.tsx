import { SidebarProvider } from '@/components/ui/fragments/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

// import Footer4Col from './site-footer';
// import NavbarDemo from './site-header';
// import SiteFooter from './site-footer';
import SiteHeader from './site-header';
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
<div className=" min-h-dvh  relative     overflow-hidden   items-center justify-center bg-gradient-to-br from-background via-muted to-background ">
        <div className="  px-5 lg:px-10 m-auto w-full">
          {paths != '/' && (

  <nav
        
        //   initial={{
        //   opacity: 1,
        //   y: -100,
        // }}
      
        className='  sticky top-0  container backdrop-blur py-3 flex items-center   '>

        <Link href="/" className='  flex    w-fit py-2 md:flex text-base items-center gap-1 text-neutral-400 hover:text-neutral-300 group transition-colors'>
               <ArrowLeft  className=" size-5  group-hover:-translate-x-1  group-hover:transform transition-all ease-out duration-300" />
               <span className=''>Back </span>
        </Link>
        </nav>
          )}
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
