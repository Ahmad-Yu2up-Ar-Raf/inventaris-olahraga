import { PinjamanDataTable } from "@/components/ui/core/dashboard/pinjaman/table/PinjamanDataTable";
import { PinjamanSchema } from "@/lib/validations/validations";
import { Filters, PaginatedData } from "@/types";

type PageProps = {
    pagination: PaginatedData;

    pinjaman: PinjamanSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}


export default function Pages( { ...props }: PageProps) {
  console.log(props)
    return (
        < >
<header className="flex flex-col gap-0.5 mb-6">
    <h2 className="text-3xl font-bold tracking-tight font-sans">Pinjaman Management</h2>
    <p className="text-muted-foreground">Here is your pinjaman list. Manage your barang here.</p>
  </header>

         
           <PinjamanDataTable    Pinjaman={props.pinjaman} PaginatedData={props.pagination} filters={props.filters}/> 
        </>
    );
}
