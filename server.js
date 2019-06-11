const axios = require( 'axios' );
const express = require( 'express' );
const app = express();
const port = process.env.PORT || 2700;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const get_data = async ( endpoint ) => {
	return axios( `http://api.coxauto-interview.com/api/${endpoint}` );
}

// Routes

app.get( '/dataset', async (req, res) => {
	let d = await get_data( 'datasetId' );
	res.json({ dataset_id: d.data.datasetId });
});

app.get( '/:ds/vehicles', async (req, res) => {
	let d = await get_data( `${req.params.ds}/vehicles` );
	res.json({ vehicles: d.data.vehicleIds });
});

app.get( '/:ds/vehicles/:vid', async (req, res) => {
	let d = await get_data( `${req.params.ds}/vehicles/${req.params.vid}` );
	res.json( d.data );
});

app.listen(port, () => console.log( `listening on port ${port}` ));
