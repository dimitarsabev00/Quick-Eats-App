import React from "react"
import {
  BsFillBellFill,
  BsToggles2,
  MdLogout,
  MdSearch,
} from "../../assets/icons"
import { motion } from "framer-motion"
import { buttonClick } from "../../assets/animations"
import { Avatar } from "../../assets"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store/hooks"
import { auth } from "../../configs/firebase"
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { toast } from "react-hot-toast"
import { logout } from "../../store"

const DBHeader: React.FC = () => {
  const [user] = useAuthState(auth)
  const [signOut] = useSignOut(auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOut = async () => {
    try {
      await signOut()
      localStorage.removeItem("user-info")
      dispatch(logout())
      navigate("/auth", { replace: true })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-2 md:py-4">
      <p className="text-xl md:text-2xl text-headingColor">
        Welcome to Quick Eats App
        {user && (
          <span className="block text-sm md:text-base text-gray-500">{`Hello ${user?.displayName || user?.email}...!`}</span>
        )}
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-xl md:text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-24 md:w-32 text-sm md:text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-xl md:text-2xl" />
        </div>

        

        <div className="flex items-center justify-center gap-2">
        <motion.div
          {...buttonClick}
          className="w-8 h-8 md:w-10 md:h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-lg md:text-xl" />
        </motion.div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.photoURL ? user?.photoURL : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...buttonClick}
            onClick={logOut}
            className="w-8 h-8 md:w-10 md:h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-400 text-lg md:text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DBHeader
