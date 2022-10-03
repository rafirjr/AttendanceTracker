import React, {useEffect} from "react";
import { useContext } from "react";
import KyligFinder from "../API/KyligFinder";
import { ScoutContext } from "../Context/ScoutContext";
import { useNavigate } from "react-router-dom";

const KyligList = (props) => {
    const history = useNavigate();
    const {scouts, setScouts} = useContext(ScoutContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await KyligFinder.get("/");
               console.log(response);
               setScouts(response.data.data.kyligs); 
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
        console.log();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await KyligFinder.delete(`/${id}`);
            setScouts(scouts.filter(scout => {
                return scout.scout_id !== id;
            })); //Delete kylig with "id" and copy rest of array back into kylig array
            console.log("deleted user");
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleUpdate = async (id) => {
        try {
            history(`/dashboard/kyligs/${id}/update`);
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
                        <th scope="col">Khoump</th>
                        <th scope="col">Gark</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Parent Name</th>
                        <th scope="col">Parent Email</th>
                        <th scope="col">Parent Cell</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {scouts && scouts.map(scout => {
                        return (
                            <tr key={scout.scout_id}>
                                <td>{scout.first_name}</td>
                                <td>{scout.last_name}</td>
                                <td>{scout.khoump}</td>
                                <td>{scout.gark}</td>
                                <td>{(scout.date_of_birth).slice(0,10)}</td>
                                <td>{scout.parent_name_one}</td>
                                <td>{scout.parent_email_one}</td>
                                <td>{scout.parent_cell_one}</td>
                                <td><button onClick={() => handleUpdate(scout.scout_id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={() => handleDelete(scout.scout_id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default KyligList;