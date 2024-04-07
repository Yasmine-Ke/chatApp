import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and rename it as Router
// routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";

const Index = () => {
  return (
    <Router>
      {" "}
      {/* Wrap Routes in Router */}
      <React.Fragment>
        <Routes>
          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<AuthProtected>{route.component}</AuthProtected>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={route.component}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
};

export default Index;
