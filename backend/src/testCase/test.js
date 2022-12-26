const mysql = require( 'mysql' )

const test = async () => {
    console.log( 'start testing' )
    let sql_con = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "11111111",
        database: 'baseball'
    } )
    let [year, month] = [2022, 6]

    sql_con.connect( ( err ) => {
        if ( err ) throw err
        console.log( "MYSQL connected!" )


        let sql = `SELECT
                        *,
                        YEAR(GameDate) AS year,
                        MONTH(GameDate) AS 'month',
                        DAY(GameDate) AS 'day'
                    FROM
                        Game
                    WHERE
                        MONTH(GameDate) = ${month}
                        AND year(GameDate) = ${year}
                    ORDER BY
                        GameDate`

        sql_con.query( sql, ( err, result ) => {
            if ( err ) throw err
            let games = result
            console.log( games )
            // sendData( clientWS, ['rp_get_teams', teamNames] )
        } )

        sql_con.end()
    } )
    console.log( 'finish testing' )
}

module.exports = {
    test: test
}