import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import OrdersData from "./OrdersData";

const DBOrders: React.FC = () => {
  const orders = useAppSelector(({ generalSlice }) => generalSlice.orders);
  const dispatch = useAppDispatch();

  const getAllOrders = async () => {
    // Fetch all orders here from DB
  };

  useEffect(() => {
    if (!orders.length) {
      getAllOrders();
    }
  }, []);

  console.log(orders);

  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
      {orders.length ? (
        <>
          {orders.map((item, i) => (
            <OrdersData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Orders</h1>
        </>
      )}
    </div>
  );
};

export default DBOrders;
