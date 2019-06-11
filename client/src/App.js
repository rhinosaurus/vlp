import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import VehicleListPage from './components/VehicleListPage';
import './App.css';

const get_dataset = async () => {
	return axios.get( 'http://localhost:2700/dataset' );
};

const get_vehicles = async (ds) => {
	if( !ds ) {
		return {
			data: { vehicles: null }
		};
	}
	return axios.get( `http://localhost:2700/${ds}/vehicles` );
};

const App = () => {
	const [ dataSet, setDataSet ] = useState( null );
	const [ vehicles, setVehicles ] = useState( [] );
	const [ pages, setPages ] = useState( {} );

	useEffect(() => {
		get_dataset().then( res => setDataSet( res.data.dataset_id ));
	}, []);

	useEffect(() => {
		get_vehicles( dataSet ).then( res => {
			if( res.data.vehicles ) {
				let i = 0, len = res.data.vehicles.length, sets = {}, page = 0;

				while( i < len ) {
					page++;
					sets[ page ] = res.data.vehicles.slice( i, i+3 );
					i=i+3;
				}

				setPages( sets );
				setVehicles( sets[ 1 ] );
			}
		});
	}, [dataSet]);

	let btns = Object.keys( pages ).map( page => <button key={page} onClick={(e) => { setVehicles(pages[page]); } }>{page}</button> );

	return (
		<div>
			<VehicleListPage dataSet={dataSet} vehicles={vehicles} />
			<div class="pages">
				{btns}
			</div>
		</div>
	);
}

export default App;
