import { ChartConfig } from "@/components/ui/fragments/chart";

export const chartConfig = {
  count: {
    label: "Motor Count",
  },
  tersedia: {
    label: "Tersedia",
    color: "var(--chart-1)",
  },
  dipinjam: {
    label: "Dipinjam", 
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
  approve: {
    label: "Approve",
    color: "var(--chart-4)",
  },
  decline: {
    label: "Decline", 
    color: "var(--chart-5)",
  },

  public: {
    label: "Public", 
    color: "var(--chart-2)",
  },
  private: {
    label: "Private",
    color: "var(--chart-3)",
  },

  other: {
    label: "Other",
    color: "var(--chart-5)",
  },

} satisfies ChartConfig