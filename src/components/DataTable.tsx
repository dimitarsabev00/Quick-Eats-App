import React from "react";
import MaterialTable, { Action, Column } from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

interface Product {
  imageURL: string;
  product_name: string;
  product_category: string;
  product_price: string;
  productId: string;
}

type ProductAction = Action<Product>;

type ProductColumn = Column<Product>;

type DataTableProps = {
  columns: ProductColumn[];
  data: Product[];
  title: string;
  actions: ProductAction[];
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
