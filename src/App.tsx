import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/home";
import AuthLayout from "./layouts/auth";
import DashboardPage from "./pages";
import LoginPage from "./pages/auth/login";
import OTPPage from "./pages/auth/otp";
import LoadingPage from "./components/loadingPage";
import { useEffect, useState } from "react";
import { setBasicConfig } from "./services/config";
import AppSettingsPage from "./pages/app-settings";
import CustomersPage from "./pages/customers";
import ProductsPage from "./pages/products";
import CategoriesPage from "./pages/categories";
import BrandsPage from "./pages/brands";
// import EnquiresPage from "./pages/enqiuries";
import OrdersPage from "./pages/orders";
import PurchasesPage from "./pages/purchases";
import TxnsPage from "./pages/tnxs";
import AdminsPage from "./pages/admins";
import AboutPage from "./pages/about";
import ProfilePage from "./pages/profile";
import ContactUsPage from "./pages/contact-us";
import CommunityRequestsPage from "./pages/community-requests";
import EnquiresPage from "./pages/enquires";


function App() {
  const [busy, setbusy] = useState(true);

  useEffect(() => {
    setBasicConfig().then(() => {
      setbusy(false);
    });
  }, []);

  if (busy) return <LoadingPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="contact-us" element={<ContactUsPage />} />
          <Route path="enquires" element={<EnquiresPage />} />
          <Route
            path="community-requests"
            element={<CommunityRequestsPage />}
          />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="category" element={<CategoriesPage />} />
          <Route path="brands" element={<BrandsPage />} />
          {/* <Route path="enquiry" element={<EnquiresPage />} /> */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="purchase" element={<PurchasesPage />} />
          <Route path="txns" element={<TxnsPage />} />
          <Route path="app-settings" element={<AppSettingsPage />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="otp" element={<OTPPage />} />
          <Route path="*" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
