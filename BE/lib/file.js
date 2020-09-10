const fs = require('fs');

class File{
    readRawData(file){
        return fs.readFileSync( file )
    }
    write(path, data){
        fs.writeFile( path.toString(), data, function ( err ) {
            if ( err ) {
                console.log( err.message );
            }
        } );
    }
}

module.exports = new File();