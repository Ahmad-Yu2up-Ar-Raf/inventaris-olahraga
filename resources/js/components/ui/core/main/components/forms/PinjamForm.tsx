"use client"
import React, {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
    FieldPath,
    FieldValues,
  useForm,
  UseFormReturn
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"

import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/fragments/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/form"
import {
  Input
} from "@/components/ui/fragments/input"
import {
  format
} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/fragments/popover"
import {
  Calendar
} from "@/components/ui/fragments/calendar"
import {
  Calendar as CalendarIcon
} from "lucide-react"



interface TaskFormProps<T extends FieldValues, >
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  
}

export default function PinjamForm<T extends FieldValues, >({
    form,
...props
}: TaskFormProps<T>) {
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
           control={form.control}
                      name={"nama" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Anda</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn"
                 className=" border-2 border-accent-foreground/10"
                type=""
                {...field} />
              </FormControl>
              <FormDescription>Masukan Nama Lengkap Anda.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="  grid md:grid-cols-2  gap-7">

      <FormField
     control={form.control}
                      name={"tanggal_dipinjam" as FieldPath<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Tanggal Pinjam</FormLabel>
          <Popover>
            <PopoverTrigger asChild className="border-accent-foreground/10">
              <FormControl>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full pl-3 outline-8 border-accent-foreground/10 border-2  text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Tanggal Pinjam</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
       <FormDescription>Masukkan Tanggal untuk meminjam barang ini.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
        
      <FormField
      control={form.control}
                      name={"tanggal_dikembalikan" as FieldPath<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Tanggal Di Kembalikan</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full pl-3 text-left  border-accent-foreground/10 border-2  font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
       <FormDescription>Masukkan Tanggal untuk mengembalikan barang ini.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
        
        </div>
        <FormField
           control={form.control}
                      name={"jumlah_pinjaman" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Pinjaman</FormLabel>
              <FormControl>
                <Input 
               
                placeholder="1"
                 className="border-2  border-accent-foreground/10"
                type="number"
                {...field} />
              </FormControl>
              <FormDescription>Masukkan jumlah dari barang pinjaman.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 {props.children}
      </form>
    </Form>
  )
}