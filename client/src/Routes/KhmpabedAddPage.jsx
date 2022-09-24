import React from "react";
import { Link } from "react-router-dom";
import AddKhmpabed from "../Components/AddKhmpabed";

const KhmpabedAddPage = () => {

    return (
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="col order-first">
                        <Link to="/dashboard/khmpabeds">
                            <button className="btn btn-outline-dark">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center my-5">Add Խմբապետ</h1>
                <AddKhmpabed/>
            </div>
        </div>
    )
}

export default KhmpabedAddPage;