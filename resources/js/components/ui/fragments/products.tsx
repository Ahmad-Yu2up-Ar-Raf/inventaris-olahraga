import { BarangsSchema } from "@/lib/validations/validations";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "./morphing-dialog";
import { Box, ChevronRight, CircleCheck, PlusIcon } from "lucide-react";

import { Button } from "./button";
import { Link } from "@inertiajs/react";


function MorphingDialogBasicOne({ product} : { product: BarangsSchema}) {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="flex  flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <MorphingDialogImage
          src={`${product.gambar}`}
          alt={product.nama}
          className="bg-muted grayscale rounded-md relative aspect-video mb-2 object-center object-cover"
        />
        <div className="flex flex-grow flex-row items-end justify-between p-2">
          <div>
            <MorphingDialogTitle className="text-zinc-950 dark:text-zinc-50">
              {product.nama}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-zinc-700 line-clamp-1 dark:text-zinc-400">
              {product.deskripsi}
            </MorphingDialogSubtitle>
          </div>
          <button
            type="button"
            className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
            aria-label="Open dialog"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <MorphingDialogImage
            src={`${product.gambar}`}
            alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
            className="h-full w-full"
          />
          <div className="p-6">
            <MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
            {product.nama}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-zinc-300 flex  justify-between items-center gap-2 dark:text-zinc-400">
              <div className="flex  items-center gap-2">

          <CircleCheck className=" text-green-300 size-4"/>  {product.status}
              </div>
              <p className=" text-sm text-green-400">
                {product.quantity} Tersedia
              </p>
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
  className="space-y-4"
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className="mt-2 text-justify line-clamp-3 leading-6 text-zinc-500 dark:text-zinc-500">
               {product.deskripsi}
              </p>
              {/* <p className="text-zinc-500">
                Research conducted in the 1970s revealed that heâ€™d designed
                the â€œEB 27â€ double-arm desk lamp in 1925, handcrafting it
                from nickel-plated brass, aluminium and varnished wood.
              </p> */}
                <Button className=' rounded-md w-full ' size={"lg"} >
                    <Link href={`/barang/${product.id}`} className="">
                        
                    Sewa Sekarang
                    </Link>
                    <ChevronRight/>
                </Button>
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className="text-zinc-50" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export { MorphingDialogBasicOne };
