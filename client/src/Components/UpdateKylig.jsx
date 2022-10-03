import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KhmpabedFinder from "../API/KhmpabedFinder";

const UpdateKhmpabed = (props) => {
    const {scout_id} = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gark, setGark] = useState("");
    const [astijan, setAstijan] = useState("");
    const [bashdon, setBashdon] = useState("");
    const [khoump, setKhoump] = useState("");
    const [cell, setCell] = useState("");
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await KhmpabedFinder.get(`/${scout_id}`);
            setFirstName(response.data.data.khmpabed.first_name);
            setLastName(response.data.data.khmpabed.last_name);
            setGark(response.data.data.khmpabed.gark);
            setAstijan(response.data.data.khmpabed.astijan);
            setBashdon(response.data.data.khmpabed.bashdon);
            setKhoump(response.data.data.khmpabed.khoump);
            setCell(response.data.data.khmpabed.cell);
            console.log(response);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedKhmpabed = await KhmpabedFinder.put(`/${scout_id}`, {
            firstName: firstName,
            lastName: lastName,
            gark: gark,
            astijan: astijan,
            bashdon: bashdon,
            khoump: khoump,
            cell: cell,
        });

        history("/dashboard/khmpabeds");
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="first_name" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="last_name" className="form-control" type="text" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="gark">Կարգ</label>
                    </div>
                    <select onChange={(e) => setGark(e.target.value)} className="custom-select" id="gark">
                        <option defaultValue={gark}>{gark}</option>
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
                        <option defaultValue={astijan}>{astijan}</option>
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
                        <option defaultValue={bashdon}>{bashdon}</option>
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
                        <option defaultValue={khoump}>{khoump}</option>
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
                    <input maxLength={15} value={cell} onChange={(e) => setCell(e.target.value)} id="cell" className="form-control" type="text" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default UpdateKhmpabed;