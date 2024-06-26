import React from "react"
import { DBLeftSection, DBRightSection } from "../components"

const Dashboard: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  )
}

export default Dashboard
