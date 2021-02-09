import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import './App.css';
import InfoBox from "./components/Infobox"
import Map from "./components/Map"
import Table from "./components/Table"
import {sortData, makeStatPretty} from "./utils"
import LineGraph from "./components/LineGraph"
import "leaflet/dist/leaflet.css"

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState('cases');
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        });
    },[])

    useEffect(() => {
        //async -> request to server, wait... => do something
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));
                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                    setMapCountries(data);
                });
        };
        getCountriesData();
    }, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : 
        `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountry(countryCode)
            setCountryInfo(data)
            if(countryCode === "worldwide"){
                setMapCenter([34.80746,-40.4796])
                setMapZoom(3)
            }else {
                setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            }
            setMapZoom(4)
        })

    }

    console.log("CountryINFO >> ")
    console.log(countryInfo)

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange} >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {
                                countries.map(country => (
                                    <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Coronavirus Cases" cases={makeStatPretty(countryInfo.todayCases)} total={makeStatPretty(countryInfo.cases)} />
                    <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recovered" cases={makeStatPretty(countryInfo.todayRecovered)} total={makeStatPretty(countryInfo.recovered)} />
                    <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={makeStatPretty(countryInfo.todayDeaths)} total={makeStatPretty(countryInfo.deaths)} />
                </div>
                <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
            </div>

            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData}/>
                    <h3 className="app__graphHeader">Worldwide new {casesType}</h3>
                    <LineGraph className="app__graph" casesType={casesType}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
