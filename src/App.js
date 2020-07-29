import React, { useEffect, useState } from 'react';
import Table from './components/table';
import MostIsolated from './components/most-isolated';
import './App.scss';
import findMostIsolatedCountry from './services/part1';
import data from './mock-data';
import { enrichList } from './services/geo-service';

const table_meta = [
    { title: 'Agent ID', key: 'agent', style: { width: '15%' } },
    { title: 'Country', key: 'country', style: { width: '15%' } },
    { title: 'Address', key: 'address', style: { width: '40%' } },
    { title: 'Date', key: 'date', style: { width: '30%' } },
];


function sortByDate(data) {
    data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

function App() {
    sortByDate(data);
    const { country, degree } = findMostIsolatedCountry(data);

    const [missions, setMissions] = useState(data);

    useEffect(() => {
        enrichList(data, '10 Downing st. London').then(list => {
            setMissions(list);
        });
    }, []);


    return (
        <div className="App">
            <div className="container">
                <Table meta={table_meta} data={missions} />
                <MostIsolated country={country} degree={degree} />
            </div>
        </div>
    );
}

export default App;
