import React from 'react';
import Vehicle from './Vehicle';

const VehicleListPage = ( props ) => {
	let vehicles;
	if( props.vehicles ) {
		vehicles = props.vehicles.map( vid => <Vehicle key={vid} vid={vid} dataSet={props.dataSet} /> );
	}

	return (
		<div class="vehicles">
			{vehicles}
		</div>
	);
};

export default VehicleListPage;
