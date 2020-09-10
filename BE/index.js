const express = require( 'express' );
const Datastore = require( 'nedb' );
const base64_manager = require( './lib/base64_manager' );
const File = require( './lib/file' );

const app = express();
const database = new Datastore( 'data.db' );
database.loadDatabase();

app.listen( 3000, () => console.log( 'I am listening' ) );

app.use( express.static( '../UI' ) );
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
	// console.log('getting');
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