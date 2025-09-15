import { BarangsSchema } from "@/lib/validations/validations";
import { Filters, PaginatedData } from "@/types";
import { ProductsUIPage } from "@/components/ui/fragments/parallax-scroll-feature-section";
import { Feature } from "@/components/ui/core/main/section/Products";

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
   <Feature products={props.barang} title="Here a list of out products!" isProductsPage/>
        </>
    );
}
