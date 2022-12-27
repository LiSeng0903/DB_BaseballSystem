const mysql = require( 'mysql' )

let sql_con = mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "11111111",
    database: 'baseball'
} )

sql_con.connect( ( err ) => {
    if ( err ) throw err
    console.log( "MYSQL connected!" )

    let sql = `SELECT * FROM Team`
    sql_con.query( sql, ( err, result ) => {
        if ( err ) throw err
        console.log( result )
    } )

    sql_con.end()
} )