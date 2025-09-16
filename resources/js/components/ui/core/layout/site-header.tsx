"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/fragments/Navbar";
import { Link } from "@inertiajs/react";
import { useAppearance } from "@/hooks/use-appearance";
import { ModeToggle } from "../../fragments/mode-toggle";
import { Button } from "../../fragments/button";
import { ArrowLeft } from "lucide-react";
const navItemss = [
    {
      name: "Home",
      link: "/",
 
    },
    {
      name: "About",
      link: "/about",
     
    },
    {
      name: "Contact",
      link: "/contact",
  
    },
  ];
export const SiteHeader = ({
  navItems = navItemss,
  className,
  paths
}: {
  navItems?: {
    name: string;
    link: string;
    
  }[];
  paths: string
  className?: string;
}) => {

    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [delay, setDelay] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
      // Check if current is not undefined and is a number
      if (typeof current === "number") {
        const direction = current! - scrollYProgress.getPrevious()!;
      setDelay(false);
  
      if (scrollYProgress.get() > 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
        
      }
    });


    const { appearance, updateAppearance } = useAppearance();

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = appearance === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        updateAppearance(newMode);
        return;
      }

      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        updateAppearance(newMode);
      });
    },
    [appearance, updateAppearance]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
         initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: delay ?  0.2 : 0.2,
            delay: delay ? 2 : 0,
          }}
        className={cn(
          "flex  container   sticky  top-3 lg:top-6 inset-x-0 mx-auto  rounded-full  ]  pr-2   items-center justify-between space-x-4",
          className
        )}
      >
      {paths != '/' ? (



<Link href="/" className='  flex    w-fit py-2 md:flex text-base items-center gap-1 text-neutral-400 hover:text-neutral-300 group transition-colors'>
       <ArrowLeft  className=" size-5  group-hover:-translate-x-1  group-hover:transform transition-all ease-out duration-300" />
       <span className=''>Back </span>
</Link>
  ) : (

        <Link href="/" className="  opacity-0  relative lg:size-15  size-10 ">

          <img
       
       src="/favicon.svg"
       alt="Auth-Image"
  
       width={500}
       height={900}
       
       className="   absolute mix-blend-difference inset-0 h-full w-full object-fill object-center "
     />
        </Link>
      
  )}
 <button className=" hover:bg-accent-foreground/5 rounded-md cursor-pointer p-3" onClick={handleThemeToggle}>
                  <ModeToggle className=" [&_svg]:size-4  lg:[&_svg]:size-5" />
                  <span className=" sr-only">Theme</span>
                </button>
      </motion.div>
    </AnimatePresence>
  );
};








// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   return (

//       <Menu active={active} setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item="Services">
//           <div className="flex flex-col space-y-4 text-sm">
//             <HoveredLink href="/">Home</HoveredLink>
//             <HoveredLink href="/events">Events</HoveredLink>
//             <HoveredLink href="/merchandise">Merchandise</HoveredLink>
//             <HoveredLink href="/gallery">Gallery</HoveredLink>
//             <HoveredLink href="/dashboard">Sign In</HoveredLink>

//           </div>
//         </MenuItem>
  
//       </Menu>

//   );
// }
