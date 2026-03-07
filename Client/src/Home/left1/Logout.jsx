import React from 'react'
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  return (
    <button
      type="button"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#ff5a66] text-white  hover:bg-[#ff3f4e] hover:shadow-md "
      aria-label="Logout"
    >
      <BiLogOut size={18} />
    </button>
  )
}

export default Logout
