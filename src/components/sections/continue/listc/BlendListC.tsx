import React, {FC, useEffect, useState} from 'react';
import {Blended_Batch} from "@entities/Blended_Batch"
import {Batch} from "@entities/Batch"
import {Link} from "react-router-dom";
import {Modal} from "../modal/Modal";

interface Props {
    blend: Blended_Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
}

export const BlendListC: FC<Props> = ({blend, setBatch}) => {
    const {blend_id, wine, blending_date, blend_to_batch} = blend;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(blending_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    const optionStyles = "list-group-item btn";


    const id = `blendmod-${blend_id}`
    return (
        <>
            <tr onClick={() => {
                setSelected(!isSelected);
            }}>
                <th scope="row">{blend_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>?</td>
            </tr>
            {isSelected && (
                <tr className="d-print-none">
                    <Modal modal_id={id} setSelected={setSelected} isSelected={isSelected} title={wine.fancy_name}>
                        <ul>
                            <li className={optionStyles}>
                                <Link onClick={() => setBatch(blend)} to={{pathname: "/winelog"}}>
                                    Complete Log
                                </Link>
                            </li>
                            <li className={optionStyles}>Output</li>
                        </ul>
                    </Modal>
                </tr>
            )}
        </>
    );
};