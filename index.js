const express = require( 'express' );
const Datastore = require( 'nedb' );
const base64_manager = require( './lib/base64_manager' );
const File = require( './lib/file' );
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const database = new Datastore( 'data.db' );
database.loadDatabase();

const PORT = process.env.port || 3000;

app.listen( PORT, () => console.log( 'I am listening' ) );

app.use( express.static( './UI' ) );
app.use( express.json( {
	limit: '1mb'
} ) );

app.post( '/api', ( req, res ) => {
	const data = req.body;
	const img = base64_manager.decode( data.img );
	console.log( "Writing..." );
	File.write( img.path, img.data );
	data.img = {
		path: img.path,
		name: img.name,
		type: img.type
	};
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert( data );
	res.json( data );
} );

app.get( '/api', ( req, res ) => {
	database.find( {}, ( err, data ) => {
		if ( err ) {
			res.json( {
				'status': 'Internal Error'
			} );
			res.end();
			return;
		}
		base64_manager.convert( data );
		res.json( data );
	} );
} );

app.get('/weather/:position', async (req, res)=>{
	const position = req.params.position.split(',');
	const lat = position[0];
	const lon = position[1];
	const key = process.env.API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
	const api_res = await fetch(url);
	res_json = await api_res.json();
	console.log(res_json);
	res.send(res_json);
});