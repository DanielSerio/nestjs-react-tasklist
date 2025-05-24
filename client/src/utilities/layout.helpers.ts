import type { ColumnDef } from "@tanstack/react-table";

export interface GridColumnProfile {
  values: number[];
  percentages: number[];
  gridTemplateColumns: string;
}

export class LayoutHelpers {
  static getGridColumnProfile<T>(columns: ColumnDef<T>[]): GridColumnProfile {
    const values = columns.slice().map((col) => col.size ?? 200);
    const total = values.reduce((acc, val) => acc + val, 0);
    const percentages = values.map((val) => (val / total) * 100);
    const gridTemplateColumns = percentages.map((v) => `${v}%`).join(' ');

    return {
      values,
      percentages,
      gridTemplateColumns,
    };
  }
}