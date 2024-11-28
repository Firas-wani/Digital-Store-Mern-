import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
// import React from "react";
// import { Link } from "react-router-dom";
// import useCategory from "../hooks/useCategory";
// import Layout from "../components/Layout/Layout";

// const Categories = () => {
//   const categories = useCategory();

//   return (
//     <Layout title={"All Categories"}>
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">All Categories</h2>
//         <div className="row">
//           {categories.map((category) => (
//             <div className="col-md-4 col-sm-6 mb-4" key={category._id}>
//               <div className="card text-center shadow-sm">
//                 <div className="card-body">
//                   <Link
//                     to={`/category/${category.slug}`}
//                     className="btn btn-primary btn-block"
//                   >
//                     {category.name}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Categories;
