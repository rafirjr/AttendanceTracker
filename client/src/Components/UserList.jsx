import React, {useEffect} from "react";
import { useContext } from "react";
import UserFinder from "../API/UserFinder";
import { UserContext } from "../Context/UserContext";

const UserList = (props) => {
    const {users, setUsers} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserFinder.get("/");
                setUsers(response.data.data.users);
                //console.log(response);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await UserFinder.delete(`/${id}`);
            setUsers(users.filter(user => {
                return user.user_id !== id;
            })); //Delete user with "id" and copy rest of array back into user array
            console.log("deleted user");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => {
                            return (
                                <tr key={user.user_id}>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td><button onClick={() => handleDelete(user.user_id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    )
}

export default UserList;