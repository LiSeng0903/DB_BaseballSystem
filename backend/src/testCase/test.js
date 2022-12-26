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

        let sql = `SELECT
                        *,
                        YEAR(GameDate) AS year,
                        MONTH(GameDate) AS 'month',
                        DAY(GameDate) AS 'day'
                    FROM
                        Game
                    WHERE
                        HomeTeam = '${teamName}'
                        OR AwayTeam = '${teamName}'
                    ORDER BY
                        GameDate`

        sql_con.query( sql, ( err, result ) => {
            if ( err ) throw err
            let history = result

            let win = 0
            let lose = 0
            let tie = 0
            let winRate = 0

            for ( let i = 0; i < history.length; i++ ) {
                // win 
                if (
                    ( history[i].HomeTeam == teamName && history[i].HomeScore > history[i].AwayScore ) ||
                    ( history[i].AwayTeam == teamName && history[i].AwayScore > history[i].HomeScore ) ) {

                    win += 1
                }
                else if (
                    ( history[i].HomeTeam == teamName && history[i].HomeScore < history[i].AwayScore ) ||
                    ( history[i].AwayTeam == teamName && history[i].AwayScore < history[i].HomeScore ) ) {

                    lose += 1
                }
                else {
                    tie += 1
                }
            }

            winRate = win / ( win + lose + tie )
            console.log( [win, lose, tie, winRate] )
        } )

        sql_con.end()
    } )
    console.log( 'finish testing' )
}

module.exports = {
    test: test
}