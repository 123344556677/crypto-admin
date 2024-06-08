import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import CashDeposit from "views/CashDeposit";
import { useEffect } from "react";
import CashWithdrawal from "views/CashWithdrawal";
import Users from "views/Users";
import Profile from "views/Profile";

const LogoutComponent = () => {
  useEffect(() => {
    // Clear any authentication tokens or user data here
    // localStorage.removeItem("token"); // Example
    // Redirect to login page
    window.location.href = "/";
    localStorage.clear();
  }, []);

  return null;
};

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: <Users/>,
    layout: "/admin",
  },
  {
    path: "/deposits",
    name: "Cash Deposits",
    icon: "nc-icon nc-bank",
    component: <CashDeposit/>,
    layout: "/admin",
  },
  {
    path: "/withdraw",
    name: "Cash Withdrawals",
    icon: "nc-icon nc-money-coins",
    component: <CashWithdrawal/>,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-settings-gear-65",
    component: <Profile/>,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "LogOut",
    icon: "nc-icon nc-user-run",
    component: <LogoutComponent/>,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
