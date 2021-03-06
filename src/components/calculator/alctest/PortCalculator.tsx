import React, {FC, useState} from 'react';
import {ModalFB} from "../../sections/ModalFB";
import {useForm} from "react-hook-form";
import {calcPort} from "../Calc";

interface Props {

}

interface Inputs {
    Alcohol: number
    BrandyProof: number
    TotalWine: number
    TotalBrandy:number
}

export const PortCalculator : FC<Props> = () => {
    const {handleSubmit, register} = useForm<Inputs>();
    const [ALC, setALC] = useState(<h4>Alcohol %: </h4>)

    const onSubmit = ({Alcohol, BrandyProof, TotalBrandy, TotalWine}:Inputs) => {

        setALC(<h3>Estimated new alcohol %: {calcPort(Alcohol, BrandyProof, TotalBrandy, TotalWine)}</h3>)
    }
 return (
     <ModalFB
         handleSubmit={handleSubmit}
         onSubmit={onSubmit}
         id={"PortCalc"}
         title={"Port Calculator"}
     >
         <>
             <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Finished Alcohol %
              </span>
                 <input type="number"
                        step={.01}
                        className={"form-control"}
                        {...register("Alcohol")}
                 />
             </div>
             <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Brandy Proof
              </span>
                 <input type="number"
                        className={"form-control"}
                        {...register("BrandyProof")}
                 />
             </div>
             <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Total liters of wine produced
              </span>
                 <input type="number"
                        step={.001}
                        className={"form-control"}
                        {...register("TotalWine")}
                 />
             </div>
             <div className={"input-group"}>
              <span className={"input-group-text"}>
                  Total liters of brandy added
              </span>
                 <input type="number"
                        step={.1}
                        className={"form-control"}
                        {...register("TotalBrandy")}
                 />
             </div>

             {ALC}
         </>
   
     </ModalFB>
 );
};