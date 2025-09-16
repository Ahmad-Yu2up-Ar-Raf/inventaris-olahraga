"use client"
import React from 'react'
import { SectionCards } from './section-card'

import { Bike,  Calendar,  Camera,  CarIcon,  CircleFadingArrowUp,  DoorOpen, Shirt, UsersRound } from "lucide-react";

import { DataCard, PageProps } from '@/types';
import { ChartPie } from './charts/chat-pie-donut-text';
import { ChartAreaInteractive } from './charts/chart-area-interactive';






function MainSection( {  reports  }: PageProps) {


const dataCards: DataCard[] = [ 
    {
      title: "Total Barang",
      description: "This is total of your Barang ",
      value: reports["totalBarang"],
      icon: Calendar,
      label: "Barang"
    },

    {
      title: "Total Pinjaman",
      description: "This is total of your Pinjaman ",
      value: reports["totalPinjaman"],
      icon: Shirt,
      label: "Pinjaman"
    },
    {
      title: "Pinjaman Diterima",
      description: "This is total of your Pinjaman  sold out ",
      value: reports["totalPinjamanDiterima"],
      icon: CircleFadingArrowUp,
      label: "Diterima"
    },
    {
      title: "Barang Dipinjam",
      description: "This is total of your Barang ",
      value: reports["totalBarangDipinjam"],
      icon: Camera,
      label: "Di Pinjam"
    },
 
  
  ];

  return (
 <>
        <section className='space-y-4'>
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionCards 
               dataCards={dataCards}
              />
        
            </div>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs gap-y-4 md:gap-x-4   @5xl/main:grid-cols-3">
               
               
    
                      <ChartAreaInteractive   className='    col-span-2    lg:col-span-3  'chartData={
             reports.countsByDate
              } />
                            {/* <ChartPie showFooter={false} title='Barang Distribution - Gender' description='Current Barang count by status' footerDeskripcion={"Showing total Barang by the status distribution"}  className='    col-span-2 lg:col-span-1 ' data={reports.statusCount}  nameKey='Barang'/> */}
               
                      <ChartPie showFooter className='    col-span-2 lg:col-span-1 ' title='Barang Distribution - Status' footerDeskripcion={"Showing total Barang by the status distribution"} description='Current Barang count by status' data={reports.BarangstatusCount} nameKey='Barang'/>
                    {/* <ChartBarActive className='    col-span-2 lg:col-span-1 '  data={reports.countsHighest
              }/> */}


<ChartPie showFooter className='    col-span-2 lg:col-span-1 ' title='Pinjaman Distribution - Status' footerDeskripcion={"Showing total merchandise by the status"} description='Current merchandise count by status' data={reports.StatusPinjamanCount} nameKey='Pinjaman'/>
            {/* <ChartPie className='    col-span-2 lg:col-span-1 ' data={EmployesRoleCounts}/> */}
                 


            <ChartPie showFooter className='    col-span-2 lg:col-span-1 ' title='Barang Distribution - Visibility' footerDeskripcion={"Showing total Barang by the Visibility distribution"} description='Current Barang count by visibility' data={reports.BarangvisibilityCount} nameKey='Barang'/>
</div>

          </div>
        </section>

 </>

  )
}

export default MainSection