import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        mulitiplier: 800,
    },

    recovered: {
        hex: "#7DD71D",
        mulitiplier: 1200,
    },

    deaths: {
        hex: "#C0C0C0",
        mulitiplier: 2000,
    },
};


export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases) ? -1 : 1)
};

export const makeStatPretty = (stat) => 
    stat ? `+${numeral(stat).format('0.0a')}` : "+0";


export const showDataOnMap = (data, casesType = "cases") => (
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
            }}
            radius={
                Math.sqrt(country[casesType] / 10) *
                casesTypeColors[casesType].mulitiplier
            }>
            <Popup>
                <div className="popup__container">
                    <div
                        className="popup__flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="popup__name">{country.country}</div>
                    <div className="popup__confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="popup__recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="popup__deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>

    ))
);







// export const sortData = (data) => {
//     const sortedData = [...data];
//     sortedData.sort((a,b) => {
//         if (a.cases > b.cases) {
//             return -1;
//         }else {
//             return 1;
//         }
//     })
//     return sortedData;
// }