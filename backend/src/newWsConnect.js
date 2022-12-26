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

                start_req_msg( task )

                switch ( task ) {
                    case 'get_teams': {
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
            }
        )
    }
}