import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerRegister from "./food_deliver/managerregister";
import CreateRestaurent from "./food_deliver/createrestaurant";
import ViewrestaurantList from "./food_deliver/viewrestarantlist";
import CustomerReg from "./food_deliver/customerreg";
import Foodlist from "./food_deliver/foodlist";
import CreateFoodList from "./food_deliver/createfoodlist";
import ManagerFoodlist from "./food_deliver/managerfoodlist";
import Viewcartlist from "./food_deliver/viewcart";
import FrontPage from "./food_deliver/frontpage"
import Login from "./food_deliver/login";
import Password from "./food_deliver/password";
import ResetPassword from "./food_deliver/resetpassword";
import ParticularManagerFoodlist from "./food_deliver/particularmanagerfoods";
import Orderlist from "./food_deliver/orderlist";
import Manageractiveorders from "./food_deliver/managerorders";
import "./App.css";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/password' element={<Password />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/managerregister" element={<ManagerRegister />} />
          <Route path="/managerfoodlist" element={<ManagerFoodlist />} />
          <Route path="/manageractiveorders" element={<Manageractiveorders />} />
          <Route path="/particularmanagerfoodlist/:id" element={<ParticularManagerFoodlist />} />
          <Route path="/customerreg" element={<CustomerReg />} />
          <Route path="/foodlist" element={<Foodlist />} />
          <Route path="/createfoodlist" element={<CreateFoodList />} />
          <Route path="/orderlist" element={<Orderlist />} />
          <Route path="/createrestaurant" element={<CreateRestaurent />} />
          <Route path="/viewrestaurantlist" element={<ViewrestaurantList />} />
          <Route path="/viewcartlist" element={<Viewcartlist />} />
        </Routes>
      </Router>
    </div>
  );
}