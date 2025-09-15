import { BarangsSchema } from "@/lib/validations/validations";
import { Filters, PaginatedData } from "@/types";
import { ProductsUIPage } from "@/components/ui/fragments/parallax-scroll-feature-section";

type PageProps = {
    pagination: PaginatedData;

    barang: BarangsSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}



export default function Barang({ ...props }: PageProps) {

console.log(props)
    return (
        <>
  
        </>
    );
}
