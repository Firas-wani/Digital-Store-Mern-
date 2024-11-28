// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";

// const Users = () => {
//   return (
//     <Layout title={"Dashboard - All Users"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>All Users</h1>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Users;
import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title="Admin Dashboard - All Users">
      <div className="container-fluid p-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Admin Menu</h5>
                <AdminMenu />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow-lg p-4">
              <h2 className="text-center mb-4">All Users</h2>
              <p className="text-muted text-center">
                Here you can manage all registered users.
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace the below with dynamic user data */}
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>john.doe@example.com</td>
                      <td>Admin</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane Smith</td>
                      <td>jane.smith@example.com</td>
                      <td>User</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                    {/* Add more rows dynamically */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
