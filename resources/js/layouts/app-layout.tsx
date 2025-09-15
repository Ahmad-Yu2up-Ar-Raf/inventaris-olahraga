import DashboardSkeleton from '@/components/ui/fragments/DashboardSkeleton';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';

import ReactLenis from 'lenis/react'

import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import SiteFooter from '@/components/ui/core/layout/site-footer';

interface AppLayoutProps {
    children?: ReactNode;
  
}




export default ({ children, ...props }: AppLayoutProps) => 
{
      const paths = usePage().url
  const pathNames = paths.split('/').filter(path => path)


 const currentPath = pathNames.length - 1 
    return(
    <AppLayoutTemplate  {...props}>
        <Head title={pathNames[currentPath]}/>
      
           <div className={cn("flex h-full flex-1 flex-col rounded-xl " ,

   pathNames[0] === 'dashboard' && 'p-5'
                 
           )}>

{children}
           </div>
          
    </AppLayoutTemplate>
);
}
