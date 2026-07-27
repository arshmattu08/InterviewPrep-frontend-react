import React from "react";
import "./PricingTile.css"

const PricingTile = ({title, dollars, num_credits}) => {


    return (
        <>
        <div id="pricing-tile">

            <h4 style={ {color:'cyan'} }>{title}</h4>
             <h4 style={ {fontSize:'22px'} }>{dollars}</h4>
              <h4 style={ {fontSize:'22px'} }>{num_credits}</h4>

        </div>
        </>
    )
}

export default PricingTile 