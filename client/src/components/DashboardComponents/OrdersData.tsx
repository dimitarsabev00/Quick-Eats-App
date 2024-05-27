import React from "react";
import { motion } from "framer-motion";
import { HiCurrencyDollar } from "../../assets/icons";
import { buttonClick, staggerFadeInOut } from "../../assets/animations";
import { useAppDispatch } from "../../store/hooks";
import { Order } from "../../Types";
import { getAllOrders, updateOrderStatus } from "../../api";
import { setOrders } from "../../store";

type OrderDataProps = {
  index: number;
  data: Order;
  admin: boolean;
};

const OrdersData: React.FC<OrderDataProps> = ({ index, data, admin }) => {
  const dispatch = useAppDispatch();

  const handleClickUpdateOrderStatus = async (orderId: number, sts: string) => {
    await updateOrderStatus(orderId, sts);
    const orders = await getAllOrders();
    dispatch(setOrders(orders));
  };
  return (
    <motion.div
      {...staggerFadeInOut}
      key={index}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Order</h1>

        <div className=" flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Total : <HiCurrencyDollar className="text-lg text-red-500" />{" "}
            <span className="text-headingColor font-bold">{data?.total}</span>
          </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (data.sts === "preparing" && "text-orange-500 bg-orange-100") ||
              (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
              (data.sts === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {data?.sts}
          </p>

          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClickUpdateOrderStatus(data.orderId, "preparing")
                }
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClickUpdateOrderStatus(data.orderId, "cancelled")
                }
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClickUpdateOrderStatus(data.orderId, "delivered")
                }
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-10 h-10 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <HiCurrencyDollar className="text-base text-red-500" />
                      {item.product_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            {data.customer_details?.name}
          </h1>

          <p className="text-base text-headingColor -mt-2">
            {data.customer.email} {data.customer.phone}
          </p>

          <p className="text-base text-textColor -mt-2">
            {/* {data?.shipping_details?.address?.line1},
            {data?.shipping_details?.address?.line2}{" "}
            {data?.shipping_details?.address?.country},
            {data?.shipping_details?.address?.state} -
            {data?.shipping_details?.address?.postal_code} */}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersData;
