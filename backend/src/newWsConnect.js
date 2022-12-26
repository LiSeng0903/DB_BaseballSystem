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

                start_req_msg( task )

                switch ( task ) {
                    case 'get_teams': {
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

                                sendData( clientWS, ['rp_get_teams', teamNames] )
                            } )

                            sql_con.end()
                        } )
                        break
                    }
                    case 'get_team_players': {
                        break
                    }
                    case 'get_team_managers': {
                        break
                    }
                    case 'get_team_captain': {
                        break
                    }
                    case 'get_games': {
                        break
                    }
                    case 'get_score': {
                        break
                    }
                    case 'get_hit_records': {
                        break
                    }
                    default: {
                        console.log( `Invalid commend!!!!!!!!!` )
                        break
                    }
                }
                end_req_msg( task )
            }
        )
    }
}