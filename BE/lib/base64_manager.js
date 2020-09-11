const File = require('./file');
const uploads = './uploads';
const Name = require( './name' );
// const fs = require('fs');

var base64_manager;

function base64_encode( file ) {
    // console.log(file);
    
    var bitmap = File.readRawData( file );
    // console.log(bitmap);
	// convert binary data to base64 encoded string
	return new Buffer.from( bitmap ).toString( 'base64' );
}


function base64_convert( data ) {
	// console.log( data );
	for ( item of data ) {
		// console.log( 'item: ' + item );
		const src = this.encode( item.img.path );
		item.img.src = `data:${item.img.type};base64,${src}`;
		// console.log( 'img: ' );
		// console.log( item.img );
	}
	return data;
}

function base64_decode(base64_str){
    const matches = base64_str.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ );
	if ( matches.length !== 3 ) {
		console.log( 'INVALID' )
	}
	const img = {};
	img.type = matches[ 1 ];
	img.data = new Buffer.from( matches[ 2 ], 'base64' );

	const extension = img.type.substr( img.type.length - 3, img.type.length - 1 );
	img.name = `${Name.makeid()}.${extension}`;
    const path = `${uploads}/${img.name}`;
    img.path = path;
    return img;
}

base64_manager = {
    encode:base64_encode,
    convert:base64_convert,
    decode: base64_decode
}

module.exports = base64_manager;