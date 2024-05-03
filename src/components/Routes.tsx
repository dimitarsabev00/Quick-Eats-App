import { Route, Routes } from "react-router";
import { Auth, Main } from "../screens";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default RoutesComp;
