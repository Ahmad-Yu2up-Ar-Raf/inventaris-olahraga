import Detail from "@/components/ui/core/main/section/detail";
import { BarangsSchema } from "@/lib/validations/validations";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";



type PageProps = {

    barang: BarangsSchema

}

export default function Barang({ ...props}: PageProps) {

  console.log(props.barang)
    return (
        <>
            
  <Detail product={props.barang}/>
        </>
    );
}
