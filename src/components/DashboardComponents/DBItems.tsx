import React from "react";
import { DataTable } from "..";

const DBItems: React.FC = () => {
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable />
    </div>
  );
};

export default DBItems;
