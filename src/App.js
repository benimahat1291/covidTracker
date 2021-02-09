import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import './App.css';
import InfoBox from "./components/Infobox"
import Map from "./components/Map"

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide')

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
                    setCountries(countries)
                });
        };
        getCountriesData();
    }, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode)
        // console.log("country", countryCode)
    }

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
                    <InfoBox title="Coronavirus Cases" cases={20001} total={1234234} />
                    <InfoBox title="Recovered" cases={3000} total={31423423} />
                    <InfoBox title="Deaths" cases={4000} total={2424245} />
                </div>
                <Map />
            </div>

            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    {/* Table */}
                    <h3>Worldwide new cases</h3>
                    {/* Graph */}
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
