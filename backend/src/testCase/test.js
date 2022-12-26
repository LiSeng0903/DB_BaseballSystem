const mysql = require( 'mysql' )

const test = async () => {
    console.log( 'start testing' )
    let sql_con = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "11111111",
        database: 'baseball'
    } )
    let GID = 5

    sql_con.connect( ( err ) => {
        if ( err ) throw err
        console.log( "MYSQL connected!" )

        let sql = `SELECT
                        GID,
                        PAID,
                        Hitter,
                        PName AS Pitcher,
                        Result
                    FROM
                        (
                            SELECT
                                GID,
                                PAID,
                                PName AS Hitter,
                                Pitcher,
                                Result
                            FROM
                                HitRecord AS H
                                INNER JOIN Player AS P ON H.Hitter = P.SID
                        ) AS T
                        INNER JOIN Player AS Pl ON T.Pitcher = Pl.SID
                    WHERE
                        GID = ${GID}
                    ORDER BY
                        Pitcher,
                        Hitter`

        sql_con.query( sql, ( err, result ) => {
            if ( err ) throw err
            let hitRecords = result
            console.log( hitRecords )
            // sendData( clientWS, ['rp_get_teams', teamNames] )
        } )

        sql_con.end()
    } )
    console.log( 'finish testing' )
}

module.exports = {
    test: test
}