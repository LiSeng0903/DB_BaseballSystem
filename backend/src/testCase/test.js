const mysql = require( 'mysql' )

const test = async () => {
    console.log( 'start testing' )
    let sql_con = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "11111111",
        database: 'baseball'
    } )
    let teamName = '富邦悍將'

    sql_con.connect( ( err ) => {
        if ( err ) throw err
        console.log( "MYSQL connected!" )

        let sql = `SELECT * FROM Player WHERE Player.Team = '${teamName}'`
        sql_con.query( sql, ( err, result ) => {
            if ( err ) throw err
            let teamPlayers = result
            console.log( teamPlayers )
        } )

        sql_con.end()
    } )
    console.log( 'finish testing' )
}

module.exports = {
    test: test
}