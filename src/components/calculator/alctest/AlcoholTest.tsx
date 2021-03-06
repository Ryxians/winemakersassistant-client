import React, {FC, useState} from 'react';
import {ModalFB} from "../../sections/ModalFB";
import {useForm} from "react-hook-form";
import {PopoverInfo} from "../../PopoverInfo";
import {calcAlc} from "../Calc";


interface Props {

}

interface Inputs {
    Start: number,
    Final: number,
    Add: number,
    Factor: number

}

// SG Factors
export const factors = (
    <table>
        <thead>
        <tr>
            <th>Starting SG</th>
            <th>Factor</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1.160</td>
            <td>6.82</td>
        </tr>
        <tr>
            <td>1.150</td>
            <td>6.84</td>
        </tr>
        <tr>
            <td>1.140</td>
            <td>6.87</td>
        </tr>
        <tr>
            <td>1.130</td>
            <td>6.9</td>
        </tr>
        <tr>
            <td>1.120</td>
            <td>6.93</td>
        </tr>
        <tr>
            <td>1.110</td>
            <td>6.96</td>
        </tr>
        <tr>
            <td>1.100</td>
            <td>7</td>
        </tr>
        <tr>
            <td>1.090</td>
            <td>7.04</td>
        </tr>
        <tr>
            <td>1.080</td>
            <td>7.09</td>
        </tr>
        <tr>
            <td>1.070</td>
            <td>7.14</td>
        </tr>
        <tr>
            <td>1.060</td>
            <td>7.2</td>
        </tr>
        <tr>
            <td>1.050</td>
            <td>7.29</td>
        </tr>
        <tr>
            <td>
                1.040
            </td>
            <td>7.39</td>
        </tr>
        <tr>
            <td>
                1.030
            </td>
            <td> 7.45</td>
        </tr>
        <tr>
            <td>
                1.020
            </td>
            <td> 7.52</td>
        </tr>
        <tr>
            <td>
                1.010
            </td>
            <td>7.59</td>
        </tr>

        </tbody>

    </table>
);


export const AlcoholTest: FC<Props> = () => {
    // Create form
    const {handleSubmit, register} = useForm<Inputs>();

    // React output
    const [ALC, setALC] = useState(<h4>Alcohol %: </h4>);


    // When the user hits the Add Button
    const onSubmit = (inputs: Inputs) => {
        let {Start, Final, Add, Factor} = inputs;

        setALC(<h4>Alcohol % Equals: {calcAlc(Start, Final, Add, Factor)}</h4>)

    }


    return (
        <ModalFB
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            id={"AlcoholTest"}
            title={"Alcohol Test"}
        >
            <>
                <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Start SG
              </span>
                    <input type="number"
                           className={"form-control"}
                           {...register("Start")}
                    />
                </div>
                <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Final SG
              </span>
                    <input type="number"
                           className={"form-control"}
                           {...register("Final")}
                    />
                </div>
                <div className={"input-group"}>
              <span className={"input-group-text text-warning"}>
                  Add pack volume (Liters)
              </span>
                    <input type="number"
                           className={"form-control"}
                           step={.001}
                           {...register("Add")}
                    />
                </div>
                <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Factor from list
              </span>
                    <PopoverInfo id={"AlcoholTestFactors"} header={"Factors"}
                                 body={factors}
                                 placement={"right"}
                    >
                        <input type="number"
                               className={"form-control"}
                               step={.001}
                               {...register("Factor")}
                        />
                    </PopoverInfo>
                </div>
                {ALC}
            </>
        </ModalFB>
    );
};