// src/DataFetcher.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
    // State variables
    const [dataType, setDataType] = useState('character'); // Default to 'character'
    const [items, setItems] = useState([]);

    // useEffect to fetch data from the API based on dataType
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/${dataType}`);
                setItems(response.data.results); // Store the results in the items state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dataType]); // Fetch new data whenever dataType changes

    return (
        <div>
            <h1>Rick and Morty {dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h1>
            <select onChange={(e) => setDataType(e.target.value)} value={dataType}>
                <option value="character">Characters</option>
                <option value="episode">Episodes</option>
                <option value="location">Locations</option>
            </select>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        ID: {item.id}, Name: {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
