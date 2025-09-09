import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/table"
import { BarangsSchema } from "@/lib/validations/validations"
import { Calendar, CircleCheck, CircleXIcon, DoorOpen, EllipsisIcon, Eye, EyeOff, User2Icon, Users2Icon, XIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/fragments/dropdown-menu";
import { Button } from "@/components/ui/fragments/button";
import { CreatebarangSheet } from "../create-sheet-barang";
import { Input } from "@/components/ui/fragments/input";
import React from "react";
import { Filters, PaginatedData } from "@/types";
import debounce from "lodash.debounce";
import { router as inertiaRouter, router, usePage } from '@inertiajs/react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/fragments/avatar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select"
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { Checkbox } from "@/components/ui/fragments/checkbox";
import { EmptyState } from "@/components/ui/fragments/empty-state";
import { Badge } from "@/components/ui/fragments/badge";

import { TasksTableActionBar } from "./barang-table-action-bar";
import { UpdateBarangSheet } from "../update-barang-sheet";
import { useInitials } from "@/hooks/use-initials";


type componentsProps = {
    Barangs : BarangsSchema[]
    filters: Filters
    className?: string
    PaginatedData: PaginatedData
}


export function BarangDataTable({Barangs, filters , className, PaginatedData}: componentsProps) {
const [selectedIds, setSelectedIds] = React.useState<(number )[]>([]);
  const [open, setOpen] = React.useState(false);
     const currentPath = window.location.pathname;
          const pathNames = currentPath.split('/').filter(path => path)[1]
    //  const [completionFilter, setCompletionFilter] = React.useState<string>(filters.merek as string);
const [searchTerm, setSearchTerm] = React.useState(filters.search);
  const [processing, setProcessing] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false)
    const debouncedSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        router.get(route(`dashboard.barang.index`), {
          search: search
        }, {
          preserveState: true,
          preserveScroll: true
        });
      }, 300),
    [pathNames] // Update dependencies
);

  const AllIds: number[] = Barangs.map(item => item.id!);

  // Check if all items are selected
  const isAllSelected = AllIds.length > 0 && AllIds.every(id => selectedIds.includes(id));
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < AllIds.length;

  const handleDelete = (taskId: number) => {
    try {
      setProcessing(true);
      
const id: number[] = [taskId] 

console.log(taskId)
          toast.loading("Barang deleting...",  { id: "event-delete" });
      router.delete(route(`dashboard.barang.destroy`, id), {
        data: { ids: id } ,
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          setProcessing(true);
        },
        onSuccess: () => {
          toast.success("Barang deleted successfully",  { id: "event-delete" });
          setOpenModal(false);
          router.reload(); 
        },
        onError: (errors: any) => {
          console.error("Delete error:", errors);
          toast.error(errors?.message || "Failed to delete the event" , { id: "event-delete" });
        },
        onFinish: () => {
          setProcessing(false);
        }
      });
    } catch (error) {
      console.error("Delete operation error:", error);
      toast.error("An unexpected error occurred",  { id: "event-delete" });
      setProcessing(false);
    }
  };



 const HandleSelectAll = () => {
    if (isAllSelected) {
      // If all selected, unselect all
      setSelectedIds([]);
    } else {
      // If not all selected, select all
      setSelectedIds([...AllIds]);
    }
  };

  const HandleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        // Remove id from selection
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        // Add id to selection
        return [...prevSelectedIds, id];
      }
    });
  };


const actions = [
  "update-status",
  "update-visiblity",
  "delete",
] as const;

  type Action = (typeof actions)[number];
  const [isPending, startTransition] = React.useTransition();
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null);
const [isAnyPending, setIsAnypending] = React.useState<boolean>(false);
  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction],
  );




  
  const onTaskDelete = React.useCallback(() => {
    setCurrentAction("delete");
    setIsAnypending(true)
    toast.loading("Deleting data...", { id: "barang-delete" });
    
    startTransition(async () => {
      try {
        router.delete(route(`dashboard.barang.destroy`, selectedIds), {
          data: { ids: selectedIds },
          preserveScroll: true,
          preserveState: true,
 
          onSuccess: () => {
            toast.success("Barangs deleted successfully", { id: "barang-delete" });
         setSelectedIds([])
            router.reload(); 
              setIsAnypending(false)
              setCurrentAction(null);
          },
          onError: (errors: any) => {
              setCurrentAction(null);
                      setIsAnypending(false)
            console.error("Delete error:", errors);
            toast.error(errors?.message || "Failed to delete the barang", { id: "barang-delete" });
          },
        });
      } catch (error) {
        toast.error("Failed to delete items", { id: "barang-delete" });
        setCurrentAction(null);
      }
    });
  }, [Barangs, selectedIds, pathNames]);



  const onTaskUpdate = React.useCallback(
    ({
      field,
      value,
    }: {
      field: "status" | "visibility" ;
      value: string;
    }) => {
      const actionType: Action =
        field === "status" ? "update-status" :
            "update-visiblity";
   setIsAnypending(true)
      setCurrentAction(actionType);

      startTransition(async () => {
        try {

          const formData = {
              
              ids: selectedIds ,
              value: value,
              colum: field
              };
      
        
      
              router.post(route(`dashboard.barang.status`, selectedIds), formData, {
                preserveScroll: true,
                preserveState: true,
                forceFormData: true,
                onBefore: (visit) => {
                  console.log('Update request about to start:', visit);
                },
                onStart: (visit) => {
                  console.log('Update request started');
                  toast.loading('Updating event data...', { id: 'update-toast' });
                },
                onSuccess: (page) => {
                  console.log('Update success response:', page);
                 setCurrentAction(null);
                      setIsAnypending(false)
                  toast.success('Barangs updated successfully', { id: 'update-toast' });
            
                },
                onError: (errors) => {
                    setCurrentAction(null);
                      setIsAnypending(false)
                  console.error('Update form submission error:', errors);
                  
        
                },
                onFinish: () => {
                 setCurrentAction(null);
                      setIsAnypending(false)
                  console.log('Update request finished');
                }
              });
   


          // Success will be handled by useEffect when isPending becomes false
        } catch (error) {
          toast.error(`Failed to update ${field}`, { id: actionType });
          console.log(error)
          setCurrentAction(null);
            setIsAnypending(true)
        }
      });
    }, 
    [Barangs, selectedIds, pathNames],
  );

const [currentBarang , setcurrentBarang ] = React.useState<(BarangsSchema) | null>(null);
    const [openUpdate, setOpenUpdate] = React.useState(false)
  const handleEdit = (event: BarangsSchema) => {
    setcurrentBarang(event);
    setOpenUpdate(true);
  };
 const handleUpdateClose = (open: boolean) => {
    setOpenUpdate(open);
    if (!open) {
      setcurrentBarang(null);
    }
  };



  const getInitial = useInitials()

  if(Barangs.length == 0 && filters.search == "")



  return(
    <>
  <EmptyState
          icons={[Calendar]}
          title={`No Barang data yet`}
          description={`Start by adding your first event`}
          action={{
            label: `Add event`,
            onClick: () => setOpen(true)
          }}
        />
        <SheetComponents 
       
         
         trigger={false}
          open={open}
         onOpenChange={() => {
      setOpen(!open)
    }}
        />
    </>
  )

    return (
    <>
    
    <div 
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
    >
    <div className=" w-full flex gap-3.5 justify-between">
           <Input
              placeholder={"Search..."}
             value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                debouncedSearch(value);
              }}
              className="md:max-w-[20em]   col-span-2  h-8 w-full  "
            />
                <SheetComponents 
       
         
         trigger
          open={open}
         onOpenChange={() => {
      setOpen(!open)
    }}
        />
    </div>


      <div className="overflow-hidden rounded-md border">

    <Table>
      <TableCaption className=" sr-only">A list of your recent barang.</TableCaption>
      <TableHeader className="bg-accent/15">
        <TableRow>
          <TableHead className="w-[100px]">   
                <Checkbox
             checked={isAllSelected}
                         onCheckedChange={HandleSelectAll}

            aria-label="Select all"
            className="translate-y-0.5  mx-3   mr-4"
          /></TableHead>
          {Barangs.length >= 1 && (
            <>
          <TableHead className=" ">Title</TableHead>

          <TableHead>Lab</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Quantity</TableHead>
       

          <TableHead className="">action</TableHead>
            </>
          )
            
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {Barangs.length > 0 ?  Barangs.map((event) =>{ 
           
        return(
 
          <TableRow key={event.id}>
            <TableCell className="font-medium sticky right-0 ">
               <Checkbox
              checked={selectedIds.includes(event.id!)}
                      onCheckedChange={() => HandleSelect(event.id!)}
            aria-label="Select row"
            className="translate-y-0.5  mx-3   mr-4"
          /></TableCell>
       <TableCell className="font-medium  flex items-center gap-4" 
            
 
            > 
            
               <Avatar className="  relative flex size-10 shrink-0 overflow-hidden rounded-full">
                                        <AvatarImage src={`${event?.gambar!}`} alt={event.nama} />
                                        <AvatarFallback className="rounded-lg  bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitial(event.nama)}
                                        </AvatarFallback>
                                    </Avatar>
            {event.nama}</TableCell>
 
            

        
          <TableCell>
            
          <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
     
              <DoorOpen/>
           
          
            <span className="capitalize ">{event.lab}</span>
         
          </Badge></TableCell>
        
          <TableCell>
            
          <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
            {event.status == 'baik' ? (

              <CircleCheck/>
            ) : (
              <CircleXIcon/>
            )}
          
            <span className="capitalize ">{event.status}</span>
         
          </Badge></TableCell>
          <TableCell>    
                 <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
            <Users2Icon />
          
            <span className="capitalize  underline-offset-4  hover:underline font-mono">{event.quantity }</span>
         
          </Badge>
          </TableCell>
            <TableCell className=" w-fit">
                <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <EllipsisIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
        
              <DropdownMenuItem
                onSelect={() => handleEdit(event)}
              >
                Edit
              </DropdownMenuItem>
  

              <DropdownMenuSeparator />
              <DropdownMenuItem
             onSelect={() => handleDelete(event.id!)}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
       
                         
            </DropdownMenuContent>
          </DropdownMenu>
          </TableCell>

          </TableRow>
       
    
        )}
      
      ) : (
              <TableRow>
                <TableCell
                  colSpan={Barangs.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
        )}
          
      </TableBody>
    

    </Table>
      </div>
    <div className=  "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
    {selectedIds.length} of {Barangs.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${PaginatedData.perPage}`}
            onValueChange={(value) => {
                inertiaRouter.get(
           route(`dashboard.barang.index`),
           { 
             perPage:value,
             
             search: filters?.search,
         
           },
           { 
             preserveState: true,
             preserveScroll: true,
             only: [pathNames, 'pagination']
           }
         )
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={PaginatedData.perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {PaginatedData.currentPage} of{" "}
          {PaginatedData.lastPage}
       
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
                 inertiaRouter.get(
           route(`dashboard.barang.index`),
           { 
             page: 1,
             search: filters?.search,
         
           },
           { 
             preserveState: true,
             preserveScroll: true,
             only: [pathNames, 'pagination']
           }
         )
            }}
            disabled={PaginatedData.currentPage == 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
                onClick={() => {
                 inertiaRouter.get(
           route(`dashboard.barang.index`),
           { 
             page: PaginatedData.currentPage - 1,
      
             search: filters?.search,
         
           },
           { 
             preserveState: true,
             preserveScroll: true,
             only: [pathNames, 'pagination']
           }
         )
            }}
            disabled={PaginatedData.currentPage == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
                 inertiaRouter.get(
           route(`dashboard.barang.index`),
           { 
             page: PaginatedData.currentPage + 1,
      
             search: filters?.search,
         
           },
           { 
             preserveState: true,
             preserveScroll: true,
             only: [pathNames, 'pagination']
           }
         )
            }}
          disabled={PaginatedData.currentPage == PaginatedData.lastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                 inertiaRouter.get(
           route(`dashboard.barang.index`),
           { 
             page: PaginatedData.lastPage,
      
             search: filters?.search,
         
           },
           { 
             preserveState: true,
             preserveScroll: true,
             only: [pathNames, 'pagination']
           }
         )
            }}
         disabled={PaginatedData.currentPage == PaginatedData.lastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </div>
  {selectedIds.length > 0 && (
        <TasksTableActionBar
        onTaskUpdate={onTaskUpdate}
        isPending={isAnyPending}
        setSelected={setSelectedIds}
          onTaskDelete={onTaskDelete}
          table={selectedIds}
          // getIsActionPending={getIsActionPending}
        />
      )}
          {currentBarang && (

       <UpdateBarangSheet
         
                  task={currentBarang }
                  open={openUpdate} 
                  onOpenChange={handleUpdateClose}
                />
          )}
    </>
  )
}



const SheetComponents = React.memo(({ 

  open, 
  trigger,
  onOpenChange,
}: {

  trigger?: boolean
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {

  return (
    <CreatebarangSheet
      trigger={trigger} 
      open={open} 
      onOpenChange={onOpenChange}
    />
  );
});

SheetComponents.displayName = 'SheetComponents';


