import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { getAllOrders } from "../api";
import { Header } from "../components";
import { Order } from "../Types";
import { setUserOrders } from "../store";
import OrdersData from "../components/DashboardComponents/OrdersData";

const UsersOrder: React.FC = () => {
  const [user] = useAuthState(auth);

  const orders = useAppSelector(({ generalSlice }) => generalSlice.orders);
  const userOrders = useAppSelector(
    ({ generalSlice }) => generalSlice.userOrders
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!orders.length) {
      getAllOrders().then((orders) => {
        const filteredOrders = orders.filter(
          (item: Order) => item.userId === user?.uid
        );
        dispatch(setUserOrders(filteredOrders));
      });
    } else {
      dispatch(
        setUserOrders(orders.filter((data) => data.userId === user?.uid))
      );
    }
  }, [orders]);
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        {userOrders?.length > 0 ? (
          <>
            {userOrders.map((item, i) => (
              <OrdersData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">
              No orders for current user
            </h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
