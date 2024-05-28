import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import OrdersData from "./OrdersData"
import { getAllOrders } from "../../api"
import { setOrders } from "../../store"

const DBOrders: React.FC = () => {
  const orders = useAppSelector(({ generalSlice }) => generalSlice.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!orders.length) {
      getAllOrders().then(orders => {
        dispatch(setOrders(orders))
      })
    }
  }, [orders.length, dispatch])

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
      {orders?.length ? (
        orders.map((item, i) => <OrdersData key={i} index={i} data={item} admin={true} />)
      ) : (
        <h1 className="text-[72px] text-headingColor font-bold">No Orders</h1>
      )}
    </div>
  )
}

export default DBOrders
