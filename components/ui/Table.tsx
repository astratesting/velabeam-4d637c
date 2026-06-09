"use client";

import {
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type HTMLAttributes,
} from "react";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const line = "#ECE6DE";
const bg = "#FBF7F2";

/* ─── Table ─── */
function Table({
  children,
  className = "",
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border" style={{ borderColor: line }}>
      <table
        className={`w-full text-sm border-collapse ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

/* ─── Thead ─── */
function Thead({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={className}
      style={{ backgroundColor: bg }}
      {...props}
    >
      {children}
    </thead>
  );
}

/* ─── Tbody ─── */
function Tbody({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props}>{children}</tbody>;
}

/* ─── Tr ─── */
function Tr({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b last:border-b-0 transition-colors hover:bg-[${bg}] ${className}`}
      style={{ borderColor: line }}
      {...props}
    >
      {children}
    </tr>
  );
}

/* ─── Th ─── */
function Th({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider ${className}`}
      style={{ color: mute }}
      {...props}
    >
      {children}
    </th>
  );
}

/* ─── Td ─── */
function Td({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-4 py-3 ${className}`}
      style={{ color: ink }}
      {...props}
    >
      {children}
    </td>
  );
}

export { Table, Thead, Tbody, Tr, Th, Td };
export default Table;
