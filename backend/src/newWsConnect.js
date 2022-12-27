const mysql = require( 'mysql' )

const sendData = ( clientWS, data ) => {
    clientWS.send( JSON.stringify( data ) )
}

const start_req_msg = ( task ) => {
    console.log( `[Client req] ${task}` )
}

const end_req_msg = ( task ) => {
    console.log( `[Finish req] ${task}` )
}

const wsConnect = {
    onMessage: ( serverWS, clientWS ) => {
        return (
            async ( byteString ) => {
                const { data } = byteString
                const [task, payload] = JSON.parse( data )

                let sql_con = mysql.createConnection( {
                    host: "localhost",
                    user: "root",
                    password: "11111111",
                    database: 'baseball'
                } )

                switch ( task ) {
                    case 'get_teams': {
                        start_req_msg( task )

                        sql_con.connect( ( err ) => {
                            if ( err ) throw err
                            console.log( "MYSQL connected!" )

                            let sql = `SELECT * FROM Team`
                            sql_con.query( sql, ( err, result ) => {
                                if ( err ) throw err
                                let teamNames = []
                                for ( let i = 0; i < result.length; i++ ) {
                                    teamNames.push( result[i].TName )
                                }

                                sendData( clientWS, ['rp_get_teams', teamNames] )
                                end_req_msg( task )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_team_players': {
                        start_req_msg( task )

                        let teamName = payload

                        sql_con.connect( ( err ) => {
                            if ( err ) throw err
                            console.log( "MYSQL connected!" )

                            let sql = `SELECT * FROM Player WHERE Player.Team = '${teamName}'`
                            sql_con.query( sql, ( err, result ) => {
                                if ( err ) throw err
                                let teamPlayers = result

                                sendData( clientWS, ['rp_get_team_players', teamPlayers] )
                                end_req_msg( task )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_team_managers': {
                        start_req_msg( task )

                        let teamName = payload

                        sql_con.connect( ( err ) => {
                            if ( err ) throw err
                            console.log( "MYSQL connected!" )

                            let sql = `SELECT * FROM Player WHERE Player.Team = '${teamName}'`
                            sql_con.query( sql, ( err, result ) => {
                                if ( err ) throw err
                                let teamManagers = result

                                sendData( clientWS, ['rp_get_team_managers', teamManagers] )
                                end_req_msg( task )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_team_captain': {
                        start_req_msg( task )

                        let teamName = payload

                        sql_con.connect( ( err ) => {
                            if ( err ) throw err
                            console.log( "MYSQL connected!" )

                            let sql = `SELECT
                                            *
                                        FROM
                                            team
                                            INNER JOIN player ON team.Captain = player.SID
                                        WHERE
                                            TName = '${teamName}'`

                            sql_con.query( sql, ( err, result ) => {
                                if ( err ) throw err
                                let teamCaptain = result[0]

                                sendData( clientWS, ['rp_get_team_captain', teamCaptain] )
                                end_req_msg( task )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_games': {
                        start_req_msg( task )

                        let [year, month] = payload

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

                                sendData( clientWS, ['rp_get_games', games] )
                                end_req_msg( task )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_score': {
                        start_req_msg( task )
                        let teamName = payload

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
                                let score = {
                                    win: win,
                                    lose: lose,
                                    tie: tie,
                                    total: win + lose + tie,
                                    winRate: winRate
                                }

                                end_req_msg( task )
                                sendData( clientWS, ['rp_get_score', [score, history]] )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_hit_records': {
                        start_req_msg( task )

                        let GID = payload

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
                                            PAID`

                            sql_con.query( sql, ( err, result ) => {
                                if ( err ) throw err
                                let hitRecords = result

                                end_req_msg( task )
                                sendData( clientWS, ['rp_get_hit_records', hitRecords] )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    default: {
                        console.log( `Invalid commend!!!!!!!!!` )
                        break
                    }
                }
            }
        )
    }
}

module.exports = {
    wsConnect: wsConnect
}