import React, {FC, useState} from 'react';
import {Batch} from '@entities/Batch';
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {PopoverInfo} from "../../../PopoverInfo";
import {sgBody} from "./SGBody";
import {InputRequiredAlert} from "../../InputRequiredAlert";

interface Filtering {
    batch_id: number
    date: Date
    sg: number
    new_tank: string
    notes: string
}

interface Props {
    batch: Batch
}

export const FilteringC: FC<Props> = ({batch}) => {
    const {handleSubmit, register, formState: {errors}} = useForm<Filtering>();


    const [close, setClose] = useState<Function>(() => {});
    const onSubmit = async (filter: Filtering) => {
        // There is an error in which batch may be undefined
        // However, if batch is undefined then the page is set to redirect.
        // So batch should never be undefined.
        filter.batch_id = batch.batch_id;
        let res = await Axios.post('/wine/add/filtering', filter);

        if (res.status === 201) {
            close();
        }
    }
    return (
        <ModalFB id={`filtering-${batch.batch_id}`} handleSubmit={handleSubmit} onSubmit={onSubmit}
                 title={"Filtering"}
                 setClose={setClose}
        >
            <>
                <div className="input-group">
                <span className="input-group-text">
                    Date of Filtering
                </span>
                    <input type="datetime-local"
                           className="form-control" {...register("date", {required: true})}/>
                </div>
                {errors.date && <InputRequiredAlert>Date is required!</InputRequiredAlert>}
                <div className="input-group">
                <span className="input-group-text">
                    Filtered SG
                </span>
                    <PopoverInfo id={`filtering-${batch.batch_id}` + "-FilteredSG"}
                                 header={"Filtered Specific Gravity"}
                                 body={sgBody}>

                        <input type="number"
                               step={.001}
                               className="form-control"
                               {...register("sg", {required: true})}
                        />
                    </PopoverInfo>
                </div>
                {errors.sg && <InputRequiredAlert>SG is required!</InputRequiredAlert>}
                <div className="input-group">
                <span className="input-group-text">
                    New Tank
                </span>
                    <input type="text"
                           className="form-control"
                           {...register("new_tank", {required: true})}
                    />
                </div>
                {errors.new_tank && <InputRequiredAlert>Please specify the new tank!</InputRequiredAlert>}
                <div className="input-group">
                <span className="input-group-text">
                    Notes
                </span>
                    <input type="text"
                           className="form-control"
                           {...register("notes")}
                    />
                </div>
            </>
        </ModalFB>
    );
};