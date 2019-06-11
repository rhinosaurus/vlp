import React, { useState, useEffect } from 'react';
import axios from 'axios';

const get_vehicle = async (ds, id) => {
	return axios.get( `http://localhost:2700/${ds}/vehicles/${id}` );
};

const Vehicle = ( props ) => {
	const [ vehicle, setVehicle ] = useState({});

	useEffect(() => {
		get_vehicle( props.dataSet, props.vid ).then( res => setVehicle( res.data ));
	}, []);

	return (
		<div class="vehicle">
			<span class="vehicle-img"><img src={`http://logo.clearbit.com/${vehicle.make}.com?size=80`} /></span>
			<ul>
				<li><strong>Year:</strong> {vehicle.year}</li>
				<li><strong>Make:</strong> {vehicle.make}</li>
				<li><strong>Model:</strong> {vehicle.model}</li>
			</ul>
		</div>
	);
};

export default Vehicle;
