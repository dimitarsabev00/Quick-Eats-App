import { Route, Routes } from "react-router";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello world!</h1>} />
    </Routes>
  );
};

export default RoutesComp;
