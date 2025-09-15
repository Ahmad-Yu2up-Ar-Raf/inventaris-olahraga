import { BarangsSchema } from "@/lib/validations/validations";



type PageProps = {

    barang: BarangsSchema

}

export default function Barang({ ...props}: PageProps) {

  console.log(props.barang)
    return (
        <>
            
    <div className=" min-h-[3232323dvh]"></div>
        </>
    );
}
