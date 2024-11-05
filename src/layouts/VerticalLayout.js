import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@layouts/VerticalLayout"; // Layout import
import { useSelector } from 'react-redux'; // برای دسترسی به استیت‌های Redux
import { userData } from "../navigation/vertical";

const VerticalLayout = (props) => {
  const [menuData, setMenuData] = useState([]);

  // از useSelector برای دسترسی به state استفاده کنید
  const items = useSelector((state) => state.role.rolePage);
  // const isAdmin = items?.roles?.some(role => role.roleName === "Administrator");

  useEffect(() => {
    console.log("Items:", items);  // بررسی داده‌های items
    const data = userData(items);  
    setMenuData(data);
  }, [items]);
  

  return (
    <Layout menuData={menuData} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;