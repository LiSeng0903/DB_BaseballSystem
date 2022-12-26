let get_test_case = require( './testCase/get_better_test_data' ).get_test_case
console.log( get_test_case() )

let mysql = require( 'mysql' )
let con = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "11111111",
    database: 'baseball'
} )

con.connect( function ( err ) {
    if ( err ) throw err
    console.log( "Connected!" )

    // let sql = 'CREATE TABLE Team ( TName VARCHAR(255) PRIMARY KEY, Captain VARCHAR(255))'
    // let sql = 'INSERT INTO Team ( TName, Captain ) VALUES (\'富邦悍將\', \'許圃菘\')'
    let sql = 'SELECT * FROM Team'

    con.query( sql, ( err, result ) => {
        if ( err ) throw err
        console.log( result[0].TName )
        console.log( "table created" )
    } )

    con.end()
} )