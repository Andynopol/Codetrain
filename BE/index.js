const express = require( 'express' );
const Datastore = require( 'nedb' );

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
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert( data );
	console.log( req.body );
	res.json( data );
} );

app.get('/api', (req, res)=>{
	database.find({}, (err, data)=>{
		if(err){
			res.json({'status':'Internal Error'});
			res.end();
			return;
		}
		res.json(data);
	});
});