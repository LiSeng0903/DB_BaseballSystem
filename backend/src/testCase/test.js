const mysql = require( 'mysql' )

const test = async () => {
    console.log( 'start testing' )
    let sql_con = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "11111111",
        database: 'baseball'
    } )

    let teamNames = []
    let teams = []
    sql_con.connect( ( err ) => {
        if ( err ) throw err
        console.log( "MYSQL connected!" )

        let sql = `SELECT * FROM Team`
        sql_con.query( sql, ( err, result ) => {
            if ( err ) throw err
            teams = result
            for ( let i = 0; i < teams.length; i++ ) {
                teamNames.push( teams[i].TName )
            }
            console.log( teamNames )
            // sendData( clientWS, ['rp_get_teams', teamNames] )
        } )

        sql_con.end()
    } )

    console.log( teamNames )
    console.log( 'finish testing' )
}

module.exports = {
    test: test
}