

import { HeroSection } from '@/components/ui/core/main/section/hero';
import SiteFooter from '@/components/ui/core/layout/site-footer';
import { Skiper19 } from '@/components/ui/fragments/svg-follow-scroll';
import { BarangsSchema } from '@/lib/validations/validations';
import { Filters, PaginatedData } from '@/types';
import { Head, } from '@inertiajs/react';
import { Feature } from '@/components/ui/core/main/section/Products';


type PageProps = {
    pagination:PaginatedData;

    barang: BarangsSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}



export default function Barang({ ...props }: PageProps) {

console.log(props.barang)

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
           <HeroSection/>
            <Feature products={props.barang}/>
        </>
    );
}
