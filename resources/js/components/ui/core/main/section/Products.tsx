import { Badge } from "@/components/ui/fragments/badge";
import { BlurFade } from "@/components/ui/fragments/blur-fade";
import { Button } from "@/components/ui/fragments/button";
import { MorphingDialogBasicOne } from "@/components/ui/fragments/products";
import { cn } from "@/lib/utils";
import { BarangsSchema } from "@/lib/validations/validations";
import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronRight } from "lucide-react";

function Feature({ products , isProductsPage , title = "Something new!" } : {products : BarangsSchema[], isProductsPage?: boolean , title?: string}) {
  return (
    <div className="w-full py-20  content-center   min-h-dvh" id="products">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <header className="flex gap-4 flex-col items-start">
          <BlurFade delay={0.25 } inView>
            
              <Badge variant={"secondary"}>Products</Badge>
            </BlurFade>
            <div className="flex gap-2 flex-col">
            <BlurFade delay={0.25 * 2 } inView>
              <h2 className="text-4xl font-serif md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                {title}
              </h2>
              </BlurFade>
              <BlurFade delay={0.25 * 3 } inView>

              <p className="md:text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough.
              </p>
              </BlurFade>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {products.map((producst, i) => (
 <BlurFade delay={0.25 * 4 + i } inView  key={i}>

   <MorphingDialogBasicOne product={producst} />
 </BlurFade>
            ))}
     
          </div>
        </div>
        <BlurFade delay={0.25 * 2 } inView>
          <Link className={cn("flex group m-auto relative justify-center gap-2 w-fit items-center  cursor-pointer text-accent-foreground/50 transition-colors hover:text-accent-foreground mt-16" , isProductsPage && 'sr-only hidden')} href="/barang" >
         <h6 className="relative w-fit inline-flex ">
          <span className='translate-y-0 skew-y-0 transition duration-500'>See more products</span>
      
         </h6>
          <div className="rounded-full  p-0.5 ">
          <ChevronRight size={18} className='group-hover:translate-x-1  group-hover:transform transition-all ease-out duration-300' />
         
           </div>
</Link>
</BlurFade>
      </div>
    </div>
  );
}

export { Feature };

