
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';


import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

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

   (pathNames[0] === 'dashboard' || pathNames[0] === 'settings') &&  'p-5'
                 
           )}>

{children}
           </div>
          
    </AppLayoutTemplate>
);
}
