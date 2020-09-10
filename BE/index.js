const express = require( 'express' );
const Datastore = require( 'nedb' );
const Name = require('./name');
const fs = require('fs');
const uploads = './uploads';
const imgSizeOf = require('buffer-image-size');




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
	const base64Image = data.img;
	const matches = base64Image.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ );
	if ( matches.length !== 3 ) {
		console.log( 'INVALID' )
	}
	const img = {};
	img.type = matches[ 1 ];
	img.data = new Buffer.from(matches[ 2 ], 'base64');

	const extension = img.type.substr(img.type.length-3, img.type.length-1);
	img.name = `${Name.makeid()}.${extension}`;
	
	const path = `${uploads}/${img.name}`;
	

    fs.writeFile(path, img.data, function(err){
		if(err)
		{
			console.log(err.message);
		}
	});
	

	data.img = {path: path,name: img.name};



	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert( data );
	// console.log( req.body );
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
		res.json( data );
	} );
} );