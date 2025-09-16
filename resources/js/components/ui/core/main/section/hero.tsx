import React from 'react'
import { Mail, SendHorizonal, Menu, X, ChevronDown, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/fragments/button'

import { InteractiveHoverButton } from '@/components/ui/fragments/interactive-button'
import { Badge } from '@/components/ui/fragments/badge'
import { BlurFade } from '@/components/ui/fragments/blur-fade'



export function HeroSection() {
    return (
        <>
            

             <div className="w-full  py-20   content-center">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
             <header className="flex gap-4 flex-col items-start">
             <BlurFade delay={0.25} inView>
                   <Badge icon={Zap} variant="outline">
          Premium
        </Badge>
            </BlurFade>
            <BlurFade  delay={0.25 * 2} inView className="flex gap-2 flex-col">
              <h2 className="text-4xl font-serif md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              SportHub Rental – Semua Gear, Satu Tempat
              </h2>
              <p className="lg:text-lg leading-7 lg:leading-relaxed  max-w-xl lg:max-w-lg  tracking-tight text-muted-foreground  text-left">
              Platform penyewaan alat olahraga terpercaya dengan koleksi lengkap, komunitas, maupun event olahraga.
              </p>
            </BlurFade>
            <div className=" gap-4 flex items-center w-full ">
            <BlurFade  delay={0.25 * 3} inView>

                <Button className=' rounded-md ' size={"default"} >
                    <a href="#products">
                        
                    Sewa Sekarang
                    </a>
                    <ChevronRight/>
                </Button>
            </BlurFade>
            <BlurFade  delay={0.25 * 4} className=' w-full' inView>

                <InteractiveHoverButton  className=" rounded-md  w-full max-w-[10em]" text="Login" href={`/login`} />
                  
              </BlurFade>
            </div>
          </header>
           <BlurFade delay={0.25 * 5} className="bg-muted h-96 rounded-md relative md:aspect-video mb-2">
<img 
                  src={`https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
   width={100} height={100} alt={'hero-main-image'}  
               className="   md:absolute relative  rounded-md w-full h-full object-cover"/>
                 </BlurFade>
            </div>
            </div>
            </div>
        </>
    )
}

