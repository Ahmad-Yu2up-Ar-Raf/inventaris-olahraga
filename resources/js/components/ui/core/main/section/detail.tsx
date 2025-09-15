import { BarangsSchema } from '@/lib/validations/validations'
import React from 'react'

import { router } from "@inertiajs/react"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import PinjamForm from '../components/forms/PinjamForm';
import { Button } from '@/components/ui/fragments/button';
import { Loader } from 'lucide-react';

import useScreenSize from "@/hooks/use-screen-size"
import MediaBetweenText from '@/components/ui/fragments/media-between-text';
import z from 'zod';
import { StatusBarangValue } from '@/config/enum-type';


function Detail({ product }: {product : BarangsSchema}) {


const pinjamanSchema = z.object({
      // id: z.number().optional(),
      barang_id: z.number().min(1),
      nama: z.string().min(4, "Name is required"),
      tanggal_dipinjam: z.coerce.date("Tanggal pinjam harus diisi",
    ),
    tanggal_dikembalikan: z.coerce.date( "Tanggal kembali harus diisi"),
  
    jumlah_pinjaman: z.coerce.number().min(1, "Harga is required").max(product.quantity, `product hanya tersedia ${product.quantity}`),
  

    // created_at: z.coerce.date().optional(),
    // updated_at: z.coerce.date().optional(),
  
  
  });
  

type PinjamanSchema = z.infer<typeof pinjamanSchema>;
  const screenSize = useScreenSize()
      const [isPending, startTransition] = React.useTransition();
const [loading, setLoading] = React.useState(false); 
const form = useForm<PinjamanSchema>({
    mode: "onChange", 
    defaultValues: {
      nama: "", 
      tanggal_dipinjam: new Date(),
      tanggal_dikembalikan: new Date(),
      barang_id: product.id,
      jumlah_pinjaman: 1
      },
    resolver: zodResolver(pinjamanSchema),
  }) 

function onSubmit(input: PinjamanSchema) {
   
    
    
console.log(input)
    toast.loading("pinjam creating....", {
      id: "create-pinjam"
    });
    
  startTransition(() => {
    setLoading(true);

    // Prepare data dengan struktur yang benar



    router.post(route('barang.store'), input, { 
      preserveScroll: true,
      preserveState: true,

      onSuccess: () => {
        form.reset();

        toast.success("pinjam created successfully", {
          id: "create-pinjam"
        });
        setLoading(false);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        toast.error(`Error: ${Object.values(error).join(', ')}`, {
          id: "create-pinjam"
        });
        setLoading(false);
      },
      onFinish: () => {
        setLoading(false);
 
      }
    });
  });
}
  return (
    <div className=' container py-5'>
        <div className="flex gap-2 flex-col">
             <MediaBetweenText
          firstText="that's a Good ("
          secondText=") choice!"
          mediaUrl={
            `${product.gambar}`
          }
          mediaType="image"
          triggerType="hover"
          mediaContainerClassName="w-full h-[30px] sm:h-[100px] overflow-hidden mx-px mt-1 sm:mx-2 sm:mt-4"
          className="cursor-pointer sm:text-6xl text-2xl  font-serif lowercase font-light flex flex-row items-center justify-center w-full"
          animationVariants={{
            initial: { width: 0 },
            animate: {
              width: screenSize.lessThan("sm") ? "30px" : "100px",
              transition: { duration: 0.4, type: "spring", bounce: 0 },
            },
          }}
        />
              <p className="lg:text-lg text-sm max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Platform penyewaan alat olahraga terpercaya dengan koleksi lengkap, komunitas, maupun event olahraga.
              </p>
            </div>
             <PinjamForm  type="barang" isPending={loading} form={form}  onSubmit={onSubmit}>
        <div className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
      
                            <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                                  {loading && <Loader className="animate-spin" />}
                              Cancel
                            </Button>
                          
                          <Button type="submit"  disabled={loading} className="w-fit  !pointer-barang-auto  dark:bg-primary  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
                            {loading && <Loader className="animate-spin" />}
                            Add
                          </Button>
        </div>
          </PinjamForm>
    </div>
  )
}

export default Detail
