import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../configs/firebase";
import { DataTable } from "..";
import { setAllUsers } from "../../store";
import { Avatar } from "../../assets";
import { User } from "../../Types";

const DBUsers: React.FC = () => {
  const allUsers = useAppSelector(({ generalSlice }) => generalSlice.allUsers);
  const mutableData = allUsers.map((user) => ({ ...user }));

  const dispatch = useAppDispatch();

  const getAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);
    const allUsers: User[] = querySnapshot.docs.map((doc) => {
      const userData = doc.data();
      return {
        id: doc.id,
        createdAt: userData.createdAt,
        uid: userData.uid,
        email: userData.email,
        photoURL: userData.photoURL,
      };
    });

    dispatch(setAllUsers(allUsers));
  };

  useEffect(() => {
    if (!allUsers.length) {
      getAllUsers();
    }
  }, []);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData: User) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : Avatar}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData: User) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={mutableData}
        title="List of Users"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event: any, rowData: User) => {
              alert("You want to edit " + rowData.email);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event: any, rowData: User) => {
              alert("You want to delete " + rowData.email);

              // if (
              //   window.confirm("Are you sure, you want to perform this action")
              // ) {
              //   // write deleteUser Functionality
              // }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBUsers;
