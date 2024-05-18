import React, { ChangeEvent, useState } from "react";
import { Input, Loader } from "..";
import { motion } from "framer-motion";

import { buttonClick } from "../../assets/animations";
import { statuses } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FaCloudUploadAlt, MdDelete } from "../../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { storage } from "../../configs/firebase";
import { toast } from "react-hot-toast";
import { setAllProducts, startLoading, stopLoading } from "../../store";
import { addNewProduct, getAllProducts } from "../../api";

const DBNewItem: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [imageDownloadURL, setImageDownloadURL] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    ({ generalSlice }) => generalSlice.isLoading
  );

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(startLoading());
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error(`Error: ${error}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageDownloadURL(downloadURL);
            dispatch(stopLoading());
            setProgress(null);
            toast.success("Image Uploaded to the cloud");
          });
        }
      );
    }
  };

  const deleteImage = (imageDownloadURL: string) => {
    dispatch(startLoading());
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      dispatch(stopLoading());
      toast.success("Image removed from the cloud");
    });
  };

  const handleSubmit = async () => {
    if (!itemName || !category || !price || !imageDownloadURL) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    dispatch(startLoading());

    const productData = {
      product_name: itemName,
      product_category: category,
      product_price: Number(price),
      imageURL: imageDownloadURL,
    };

    try {
      await addNewProduct(productData);
      toast.success("New Item added successfully");

      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);

      const allProducts = await getAllProducts();
      dispatch(setAllProducts(allProducts));
    } catch (error: any) {
      toast.error(error);
      toast.error("Failed to add new item");
    }

    dispatch(stopLoading());
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <Input
          type="text"
          placeHolder={"Item name here"}
          handleOnChange={setItemName}
          value={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <Input
          type="number"
          placeHolder={"Item price here"}
          handleOnChange={setPrice}
          value={price}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Loader />
              {progress !== null && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className=" w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className=" w-full h-full object-cover"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImage(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={handleSubmit}
          {...buttonClick}
          className="w-full py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export default DBNewItem;
