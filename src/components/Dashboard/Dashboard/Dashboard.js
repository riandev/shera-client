import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faCalendar,
  faGripHorizontal,
  faUsers,
  faTachometerAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import AddQuery from "../AddQuery/AddQuery";
import "./Dashboard.css";
import ManageQuery from "../ManageQuery/ManageQuery";
import DashboardHome from "../DashboardHome/DashboardHome";
import user from "../../../image/user.png";
import logo from "../../../image/logo.png";

const routes = [
  {
    path: "/dashboard/addquery",
    exact: true,
    sidebar: () => <div></div>,
    main: () => (
      <div>
        <AddQuery></AddQuery>
      </div>
    ),
  },
  {
    path: "/dashboard",
    exact: true,
    sidebar: () => <div></div>,
    main: () => (
      <div>
        <DashboardHome></DashboardHome>
      </div>
    ),
  },
  {
    path: "/dashboard/managequery",
    exact: true,
    sidebar: () => <div></div>,
    main: () => (
      <div>
        <ManageQuery></ManageQuery>
      </div>
    ),
  },
];

const Dashboard = () => {
  const agentEmail = sessionStorage.getItem("agent");
  const handleLogout = () => {
    <Redirect to="/" />;
    sessionStorage.removeItem("agent");
    window.location.reload(true);
  };
  
  
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          className="sidebar d-flex flex-column justify-content-between py-5 px-4"
          style={{ height: "100vh" }}
        >
          <ul className="list-unstyled">
            <img
              className="img-fluid w-75 mb-4"
              style={{ borderRadius: "10px" }}
              src={logo}
              alt=""
            />
            <div>
              <img
                className="img-fluid w-25 ml-5"
                style={{ borderRadius: "50%" }}
                src={user}
                alt=""
              />
              <p className="text-white mb-4 ml-3">{agentEmail}</p>
            </div>
            <li>
              <Link to="/dashboard" className="text-white">
                <FontAwesomeIcon icon={faTachometerAlt} />{" "}
                <span>Dashboard</span>
              </Link>
            </li>
            {/* //User Part */}
            <div>
              <li>
                <Link to="/dashboard/addquery" className="text-white">
                  <FontAwesomeIcon icon={faCalendar} /> <span>add Query</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/managequery" className="text-white">
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  <span>Manage Query</span>
                </Link>
              </li>
            </div>
          </ul>
          {/* //Logout */}
          <div>
            <Link to="/" onClick={handleLogout} className="text-white">
              <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
            </Link>
            {/* <button onClick={handleLogout}>Sign out</button> */}
          </div>
          <Switch>
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
