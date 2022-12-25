import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../model/models.js'

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

                switch ( task ) {
                    case 'get_teams': {
                        start_req_msg( task )

                        let team_names = []
                        let teams = await Team.find( {} )
                        for ( let i = 0; i < teams.length; i++ ) {
                            team_names.push( teams[i].TName )
                        }
                        sendData( clientWS, ['rp_get_teams', team_names] )

                        end_req_msg( task )
                        break
                    }
                    case 'get_team_members': {

                    }
                    default:
                        break
                }
            }
        )
    }
}

export { wsConnect }