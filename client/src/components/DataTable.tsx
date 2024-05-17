import React from "react";
import MaterialTable, { Action, Column } from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Product } from "../Types";

type ProductAction = Action<Product>;

type ProductColumn = Column<Product>;

type DataTableProps = {
  columns: any[];
  data: any[];
  title: string;
  actions: any[];
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  actions,
}) => {
  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTable;
