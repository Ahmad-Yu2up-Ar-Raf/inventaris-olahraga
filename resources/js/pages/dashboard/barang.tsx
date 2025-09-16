import { BarangDataTable } from "@/components/ui/core/dashboard/events/table/BarangDataTable";
import { BarangsSchema } from "@/lib/validations/validations";
import { Filters, PaginatedData } from "@/types";



type PageProps = {
    pagination: PaginatedData;

    barang: BarangsSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}


export default function Pages( { ...props } : PageProps) {
  console.log(props.barang)
    return (
        < >

<header className="flex flex-col gap-0.5 mb-6">
    <h2 className="text-3xl font-bold tracking-tight font-sans">Barang Management</h2>
    <p className="text-muted-foreground">Here is your pinjaman list. Manage your barang here.</p>
  </header>

            
  <BarangDataTable Barangs={props.barang} PaginatedData={props.pagination} filters={props.filters}/>
        </>
    );
}
