import React from "react"
import { DataTable } from ".."
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { HiCurrencyDollar } from "../../assets/icons"
import { setAllProducts } from "../../store"
import { toast } from "react-hot-toast"
import { deleteProduct, getAllProducts } from "../../api"
import { Product } from "../../Types"

const DBItems: React.FC = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products)
  const mutableData = products.map(product => ({ ...product }))

  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData: Product) => (
              <img src={rowData.imageURL} className="w-32 h-16 object-contain rounded-md" />
            )
          },
          {
            title: "Name",
            field: "product_name"
          },
          {
            title: "Category",
            field: "product_category"
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData: Product) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center">
                <HiCurrencyDollar className="text-red-400" />
                {rowData.product_price.toFixed(2)}
              </p>
            )
          }
        ]}
        data={mutableData}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (_event: any, rowData: Product) => {
              alert("You want to edit " + rowData.product_name)
            }
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: async (_event: any, rowData: Product) => {
              if (window.confirm("Are you sure, you want to perform this action")) {
                try {
                  if (rowData.productId) {
                    await deleteProduct(rowData.productId)
                    toast.success("Product Deleted")

                    const allProducts = await getAllProducts()
                    dispatch(setAllProducts(allProducts))
                  }
                } catch (error: any) {
                  toast.error("Failed to delete the product: " + error.message)
                }
              }
            }
          }
        ]}
      />
    </div>
  )
}

export default DBItems
