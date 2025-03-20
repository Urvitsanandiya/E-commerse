import Addproducts from "./components/Addproducts";
import Productslist from "./components/Productslist";
import Userlist from "./components/Userlist";
import { Navigate, Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/productslist" />} />
        <Route path="/productslist" element={<Productslist />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="/userslist" element={<Userlist />} />
      </Routes>
    </>
  );
};

export default App;
