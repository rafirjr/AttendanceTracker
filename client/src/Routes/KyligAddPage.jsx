import React from "react";
import { Link } from "react-router-dom";
import AddKylig from "../Components/AddKylig";

const KyligAddPage = () => {

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
                <h1 className="text-center my-5">Add Քայլիկ</h1>
                <AddKylig/>
            </div>
        </div>
    )
}

export default KyligAddPage;