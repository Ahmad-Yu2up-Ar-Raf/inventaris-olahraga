
export interface OptionItem {
    value: string;
    label: string;
    country?: string;
  }
  
  export interface GroupedOptions {
    [key: string]: OptionItem[];
  }
  

  export const StatusBarang: OptionItem[] = [
    { value: 'baik', label: 'Baik' },
    { value: 'buruk', label: 'Buruk ' },

    
  ];




//   export type StatusEventsValue = typeof StatusEvents[number]['value'];
export const StatusBarangValue: string[] = StatusBarang.map(function(item) {
    return item['value'];
  });




