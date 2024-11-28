
import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard - E-commerce App">
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>

          {/* User Info */}
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">User Information</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name:</strong> {auth?.user?.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {auth?.user?.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Address:</strong> {auth?.user?.address || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
