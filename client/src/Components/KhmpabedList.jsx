import React, {useEffect} from "react";
import { useContext } from "react";
import KhmpabedFinder from "../API/KhmpabedFinder";
import { KhmpabedContext } from "../Context/KhmpabedContext";
import { useNavigate } from "react-router-dom";

const KhmpabedList = (props) => {
    const history = useNavigate();
    const {khmpabeds, setKhmpabeds} = useContext(KhmpabedContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await KhmpabedFinder.get("/");
               setKhmpabeds(response.data.data.khmpabeds); 
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await KhmpabedFinder.delete(`/${id}`);
            setKhmpabeds(khmpabeds.filter(khmpabed => {
                return khmpabed.scout_id !== id;
            })); //Delete khmpabed with "id" and copy rest of array back into khmpabed array
            console.log("deleted user");
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpdate = async (id) => {
        try {
            history(`/dashboard/khmpabeds/${id}/update`);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gark</th>
                        <th scope="col">Astijan</th>
                        <th scope="col">Bashdon</th>
                        <th scope="col">Khoump</th>
                        <th scope="col">Cell</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {khmpabeds && khmpabeds.map(khmpabed => {
                        return (
                            <tr key={khmpabed.scout_id}>
                                <td>{khmpabed.first_name}</td>
                                <td>{khmpabed.last_name}</td>
                                <td>{khmpabed.gark}</td>
                                <td>{khmpabed.astijan}</td>
                                <td>{khmpabed.bashdon}</td>
                                <td>{khmpabed.khoump}</td>
                                <td>{khmpabed.cell}</td>
                                <td><button onClick={() => handleUpdate(khmpabed.scout_id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={() => handleDelete(khmpabed.scout_id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default KhmpabedList;