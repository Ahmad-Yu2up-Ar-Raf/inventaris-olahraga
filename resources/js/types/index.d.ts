import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface Reports {
    totalBarang: number
    totalPinjaman: number
    totalPinjamanDiterima: number
    totalBarangDipinjam: number
    BarangvisibilityCount:  Record<string, number>
   
    BarangstatusCount: Record<string, number>
    StatusPinjamanCount: Record<string, number>
    countsByDate: ChartDataType[]
    [key: string]: unknown; 
}

export interface ChartDataType {
    date: string;
    pinjaman?: number;
    barang?: number;
    [key: string]: number; 
  }

export interface tabsLinktype{
    link: string
    name: string
  }
export type PageProps = {
    reports : Reports
 }


export interface Filters {
    search?: string;
    
    status?: string[] | string;
    [key: string]: unknown;
}

export interface DataCard { 
    title: string;
    description: string;
    value: number;
    icon: LucideIcon;
   label?: string;
  }
  

export interface PaginatedData {
    data:  EventsSchema[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}


export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface sidebarType {  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}
