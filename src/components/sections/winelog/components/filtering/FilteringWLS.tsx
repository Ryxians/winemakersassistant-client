import React, {FC, useEffect, useState} from 'react';
import {Filtering} from '@entities/Filtering'
import {Batch} from '@entities/Batch'
import Axios from "axios";
import {FilteringWLC} from "./FilteringWLC";
import {FilteringC} from "../../../manage/stage-components/FilteringC";

interface Props {
    batch: Batch
}

export const FilteringWLS: FC<Props> = ({batch}) => {
    const [filterings, setFilters] = useState<Filtering[]>();

    const getFilters = () => {
        Axios.get(`/wine/get/filtering/${batch.batch_id}`).then(res => {
            let filter: Filtering[] = res.data;

            filter.forEach((fltr) => {
                fltr.date = new Date(fltr.date);
            });

            setFilters(filter);
        })
    }

    const filters = () => {
        // When creating components in mass they need to have a key
        // i will be the key
        let i = 0;
        if (filterings && filterings.length > 0) {
            const sorted = filterings.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            });
            const list = sorted.map(fltr => {
                let rc = <FilteringWLC key={i} filtering={fltr}/>
                i++;
                return rc;
            })

            return list;
        } else {
            return (
                <>
                    <h3>This Wine Hasn't Been Filtered Yet.</h3>
                    <FilteringC batch={batch}/>
                </>
            )
        }
    }

    useEffect(() => {
        getFilters();
    }, []);
    return (
        <div>
            {filterings ? filters() : <h3>No Filtering Section</h3>}
        </div>
    );
};