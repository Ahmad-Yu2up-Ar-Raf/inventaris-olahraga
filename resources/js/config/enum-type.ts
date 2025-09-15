
export interface OptionItem {
    value: string;
    label: string;
    country?: string;
  }
  
  export interface GroupedOptions {
    [key: string]: OptionItem[];
  }
  

  export const StatusBarang: OptionItem[] = [
    { value: 'tersedia', label: 'Tersedia' },
    { value: 'dipinjam', label: 'Dipinjam ' },

    
  ];
  export const visibility: OptionItem[] = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private ' },

    
  ];
  export const StatusPinjaman: OptionItem[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'Aprove', label: 'Aprove ' },
    { value: 'decline', label: 'Decline ' },    
  ];





//   export type StatusEventsValue = typeof StatusEvents[number]['value'];
export const StatusBarangValue: string[] = StatusBarang.map(function(item) {
    return item['value'];
  });
export const StatusPinjamanValue: string[] = StatusPinjaman.map(function(item) {
    return item['value'];
  });


  export const visibilityValue : string[] = visibility.map(function(item) {
    return item['value'];
  });

