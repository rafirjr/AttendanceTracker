import React from "react";
//import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import ScoutFinder from "../API/ScoutFinder";
import { ScoutContext } from "../Context/ScoutContext";

const AddKhmpabed = (props) => {
    const {addScout} = useContext(ScoutContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [khoump, setKhoump] = useState("");
    const [gark, setGark] = useState("");
    const [dob, setDOB] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [contact_num, setContactNum] = useState("");
    const [parent_name_one, setParentNameOne] = useState("");
    const [parent_cell_one, setParentCellOne] = useState("");
    const [parent_email_one, setParentEmailOne] = useState("");
    const [parent_name_two, setParentNameTwo] = useState("");
    const [parent_cell_two, setParentCellTwo] = useState("");
    const [parent_email_two, setParentEmailTwo] = useState("");
    const [allergies, setAllergies] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ScoutFinder.post("/", {
                firstName: firstName, 
                lastName: lastName,
                khoump: khoump,
                gark: gark, 
                dob: dob,
                street: street,
                city: city,
                state: state,
                zip: zip,
                contact_num: contact_num,
                parent_name_one: parent_name_one,
                parent_cell_one: parent_cell_one,
                parent_email_one: parent_email_one,
                parent_name_two: parent_name_two,
                parent_cell_two: parent_cell_two,
                parent_email_two: parent_email_two,
                allergies: allergies,

            });
            addScout(response.data.data.newScout);
            console.log(response);

            history("/dashboard/kyligs");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} id="first_name" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} id="last_name" className="form-control" type="text" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="gark">Կարգ</label>
                    </div>
                    <select onChange={(e) => setGark(e.target.value)} className="custom-select" id="gark">
                        <option value="Norendza">Norendza</option>
                        <option value="Pen Gark">Pen Gark</option>
                        <option value="Ayp Gark">Ayp Gark</option>
                        <option value="Vgayal">Vgayal</option>
                        <option value="Araratyan">Araratyan</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="astijan">Աստիճան</label>
                    </div>
                    <select onChange={(e) => setAstijan(e.target.value)} className="custom-select" id="astijan">
                        <option value="Pokh Arachnort">Pokh Arachnort</option>
                        <option value="Arachnort">Arachnort</option>
                        <option value="Vareech Arachnort">Vareech Arachnort</option>
                        <option value="Pokh Khmpabed">Pokh Khmpabed</option>
                        <option value="Khmpabed">Khmpabed</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="bashdon">Պաշտօն</label>
                    </div>
                    <select onChange={(e) => setBashdon(e.target.value)} className="custom-select" id="bashdon">
                        <option value="Pokh Arachnort">Pokh Arachnort</option>
                        <option value="Arachnort">Arachnort</option>
                        <option value="Vareech Arachnort">Vareech Arachnort</option>
                        <option value="Pokh Khmpabed">Pokh Khmpabed</option>
                        <option value="Khmpabed">Khmpabed</option>
                        <option value="Miavori">Miavori</option>
                        <option value="Pokh Masnajooghi Khmpabed">Pokh Masnajooghi Khmpabed</option>
                        <option value="Masnajooghi Khmpabed">Masnajooghi Khmpabed</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="khoump">Խումբ</label>
                    </div>
                    <select onChange={(e) => setKhoump(e.target.value)} className="custom-select" id="khoump">
                        <option value="Kylig">Kylig</option>
                        <option value="Ardzvig">Ardzvig</option>
                        <option value="Ari">Ari</option>
                        <option value="Arenoush">Arenoush</option>
                        <option value="Yeretz">Yeretz</option>
                        <option value="Barmanouhi">Barmanouhi</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cell">Cell</label>
                    <input maxLength={15} onChange={(e) => setCell(e.target.value)} id="cell" className="form-control" type="text" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Add</button>
            </form>
        </div>
    )


}


export default AddKhmpabed;