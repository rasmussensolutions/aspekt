"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type Row,
  type RowData,
  type SortingState,
  type TableOptions,
} from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { cn } from "cnfast";
import * as React from "react";

const tableWrapperVariants = cva(
  [
    "w-full overflow-hidden text-foreground",
    "[--table-cell-x:1rem] [--table-cell-y:0.75rem]",
  ],
  {
    variants: {
      variant: {
        outline: "border border-border bg-card shadow-sm",
        soft: "border border-transparent bg-muted",
        ghost: "border border-transparent bg-transparent",
      },
      size: {
        compact:
          "text-xs [--table-cell-x:0.75rem] [--table-cell-y:0.5rem]",
        medium:
          "text-sm [--table-cell-x:1rem] [--table-cell-y:0.75rem]",
        large:
          "text-sm [--table-cell-x:1.25rem] [--table-cell-y:1rem]",
      },
      shape: {
        square: "rounded-lg",
        round: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "medium",
      shape: "square",
    },
  },
);

const tableRowVariants = cva(
  ["group/table-row border-b border-border transition-colors last:border-b-0"],
  {
    variants: {
      hoverable: {
        true: "hover:bg-muted",
        false: "",
      },
      striped: {
        true: "odd:bg-transparent even:bg-muted/60",
        false: "",
      },
    },
    defaultVariants: {
      hoverable: true,
      striped: false,
    },
  },
);

const tableHeaderVariants = cva(
  [
    "border-y border-border bg-transparent px-[var(--table-cell-x)] py-[var(--table-cell-y)] align-middle text-xs font-semibold text-muted-foreground",
  ],
);

type TableVariant = "outline" | "soft" | "ghost";
type TableSize = "compact" | "medium" | "large";
type TableShape = "square" | "round";
type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

type TableProps<TData extends RowData> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
    caption?: React.ReactNode;
    captionClassName?: string;
    columns: TableColumnDef<TData>[];
    data: TData[];
    defaultSorting?: SortingState;
    emptyState?: React.ReactNode;
    getRowId?: TableOptions<TData>["getRowId"];
    headerClassName?: string;
    hoverable?: boolean;
    loading?: boolean;
    loadingState?: React.ReactNode;
    manualSorting?: boolean;
    onSortingChange?: OnChangeFn<SortingState>;
    rowClassName?: string | ((row: Row<TData>) => string | undefined);
    shape?: TableShape | null;
    showColumnBorders?: boolean;
    size?: TableSize | null;
    sortable?: boolean;
    sorting?: SortingState;
    stickyHeader?: boolean;
    striped?: boolean;
    tableClassName?: string;
    variant?: TableVariant | null;
  };

function SortIndicator({ direction }: { direction: false | "asc" | "desc" }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "size-3.5 shrink-0 transition-colors",
        direction ? "text-foreground" : "text-muted-foreground",
      )}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5 6.5L8 3.5L11 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === "desc" ? 0.35 : 1}
      />
      <path
        d="M5 9.5L8 12.5L11 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === "asc" ? 0.35 : 1}
      />
    </svg>
  );
}

function getAriaSort(direction: false | "asc" | "desc") {
  if (direction === "asc") return "ascending";
  if (direction === "desc") return "descending";
  return "none";
}

function getColumnCount<TData extends RowData>(
  table: ReturnType<typeof useReactTable<TData>>,
) {
  return Math.max(table.getAllLeafColumns().length, 1);
}

function Table<TData extends RowData>({
  caption,
  captionClassName,
  className,
  columns,
  data,
  defaultSorting = [],
  emptyState = "No results.",
  getRowId,
  headerClassName,
  hoverable = true,
  loading = false,
  loadingState = "Loading...",
  manualSorting = false,
  onSortingChange,
  rowClassName,
  shape,
  showColumnBorders = false,
  size,
  sortable = true,
  sorting: sortingProp,
  stickyHeader = false,
  striped = false,
  tableClassName,
  variant,
  ...props
}: TableProps<TData>) {
  const [internalSorting, setInternalSorting] =
    React.useState<SortingState>(defaultSorting);
  const sorting = sortingProp ?? internalSorting;

  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updaterOrValue) => {
      if (sortingProp === undefined) {
        setInternalSorting(updaterOrValue);
      }

      onSortingChange?.(updaterOrValue);
    },
    [onSortingChange, sortingProp],
  );

  const table = useReactTable({
    columns,
    data,
    enableSorting: sortable,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    manualSorting,
    onSortingChange: handleSortingChange,
    state: {
      sorting,
    },
    ...(sortable && !manualSorting
      ? { getSortedRowModel: getSortedRowModel() }
      : null),
  });

  const rows = table.getRowModel().rows;
  const columnCount = getColumnCount(table);

  return (
    <div
      data-slot="table-wrapper"
      className={cn(tableWrapperVariants({ shape, size, variant }), className)}
      {...props}
    >
      <div data-slot="table-scroll" className="max-w-full overflow-auto">
        <table
          data-slot="table"
          className={cn("w-full border-collapse text-left", tableClassName)}
        >
          {caption ? (
            <caption
              data-slot="table-caption"
              className={cn(
                "px-[var(--table-cell-x)] py-[var(--table-cell-y)] text-left text-sm text-muted-foreground",
                captionClassName,
              )}
            >
              {caption}
            </caption>
          ) : null}

          <thead data-slot="table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} data-slot="table-header-row">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      data-slot="table-head"
                      aria-sort={canSort ? getAriaSort(sorted) : undefined}
                      className={cn(
                        tableHeaderVariants(),
                        stickyHeader ? "sticky top-0 z-10 backdrop-blur" : "",
                        showColumnBorders
                          ? "border-r border-border last:border-r-0"
                          : "",
                        headerClassName,
                      )}
                      scope="col"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="inline-flex max-w-full items-center gap-2 text-left outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="min-w-0 truncate">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                          <SortIndicator direction={sorted} />
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody data-slot="table-body">
            {loading ? (
              <tr data-slot="table-loading-row">
                <td
                  data-slot="table-loading"
                  className="px-[var(--table-cell-x)] py-8 text-center text-sm text-muted-foreground"
                  colSpan={columnCount}
                >
                  {loadingState}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr data-slot="table-empty-row">
                <td
                  data-slot="table-empty"
                  className="px-[var(--table-cell-x)] py-8 text-center text-sm text-muted-foreground"
                  colSpan={columnCount}
                >
                  {emptyState}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-slot="table-row"
                  className={cn(
                    tableRowVariants({ hoverable, striped }),
                    typeof rowClassName === "function"
                      ? rowClassName(row)
                      : rowClassName,
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      data-slot="table-cell"
                      className={cn(
                        "px-[var(--table-cell-x)] py-[var(--table-cell-y)] align-middle text-foreground",
                        showColumnBorders
                          ? "border-r border-border last:border-r-0"
                          : "",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Table, tableHeaderVariants, tableWrapperVariants };
export type {
  TableColumnDef,
  TableProps,
  TableShape,
  TableSize,
  TableVariant,
  SortingState as TableSortingState,
};
