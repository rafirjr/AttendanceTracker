import React from "react";
import UpdateKylig from "../Components/UpdateKylig";
import { Link } from "react-router-dom";

const KyligUpdatePage = () => {
    return (  
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="col order-first">
                        <Link to="/dashboard/kyligs">
                            <button className="btn btn-outline-dark">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center my-5">Update Քայլիկ</h1>
                <UpdateKylig/>
            </div>
        </div>
    )
}

export default KyligUpdatePage;