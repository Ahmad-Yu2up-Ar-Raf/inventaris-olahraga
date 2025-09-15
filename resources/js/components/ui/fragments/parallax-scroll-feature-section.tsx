'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { BarangsSchema } from "@/lib/validations/validations";
import { InteractiveHoverButton } from "./interactive-button";


type producstComponentType = {
    sections: BarangsSchema[]
}

export const ProductsUIPage = ({ sections}: producstComponentType) => {
    // Array of section data
   

    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    const scrollYProgress = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    // Create animations for each section
    const opacityContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );
    
    const translateContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
   


       <section id="products" className="flex min-h-dvh my-20 content-center flex-col md:px-0 px-10">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`h-screen flex flex-col lg:flex-row items-center justify-center md:gap-40 gap-20 ${index % 2 == 0 ? ' lg:flex-row-reverse' : ''}`}
                >

<motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="relative"
                    >
                        <img 
                            src={`${section.gambar}`} 
                            className="  lg:order-2  w-full h-full max-w-xl max-h-96 object-center object-cover" 
                            alt={`Section ${section.id}` }
                        />
                    </motion.div>

                    <motion.div style={{ y: translateContents[index] }} className=" lg:order-1">
                        <div className="text-6xl max-w-sm">{section.nama}</div>
                        <motion.p 
                            style={{ y: translateContents[index] }} 
                            className="text-accent-foreground/70 max-w-sm mt-10 "
                        >
                            {section.deskripsi}
                        </motion.p>
                        <InteractiveHoverButton className=" mt-10 w-full" text="Pinjam Sekarang" href={`/barang/${section.id}`} />
                    </motion.div>
               
               
                </div>
            ))}
        </section>
      
  );
};
