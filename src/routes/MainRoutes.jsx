import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import Loadable from "../components/Loadable";
import Nimadir from "../pages/Nimadir";
import Appp from "../pages/Appp";

const Current = Loadable(lazy(() => import("../pages/Current")));
const Hourly = Loadable(lazy(() => import("../pages/Hourly")));
const Daily = Loadable(lazy(() => import("../pages/Daily")));
const Profile = Loadable(lazy(() => import("../pages/Profile")));

const MainRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Current />,
      },
      // {
      //   path: "/hourly",
      //   element: <Hourly />,
      // },
      // {
      //   path: "/daily",
      //   element: <Daily />,
      // },
      // {
      //   path: "/a",
      //   element: <Nimadir />,
      // },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export default MainRoutes;
