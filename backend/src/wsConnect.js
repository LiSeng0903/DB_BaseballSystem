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

                        let teamNames = []
                        let teams = await Team.find( {} )
                        for ( let i = 0; i < teams.length; i++ ) {
                            teamNames.push( teams[i].TName )
                        }
                        sendData( clientWS, ['rp_get_teams', teamNames] )

                        end_req_msg( task )
                        break
                    }
                    case 'get_team_players': {
                        start_req_msg( task )

                        let teamName = payload
                        let teamPlayers = await Player.find( { Team: teamName } )
                        sendData( clientWS, ['rp_get_team_players', teamPlayers] )

                        end_req_msg( task )
                        break
                    }
                    case 'get_team_managers': {
                        start_req_msg( task )

                        let teamName = payload
                        let teamManagers = await Manager.find( { Team: teamName } )
                        sendData( clientWS, ['rp_get_team_managers', teamManagers] )

                        end_req_msg( task )
                        break
                    }
                    case 'get_team_captain': {
                        start_req_msg( task )
                        let teamName = payload
                        let targetTeam = await Team.findOne( { TName: teamName } )
                        let captain = await Player.findOne( { SID: targetTeam.Captain } )
                        sendData( clientWS, ['rp_get_team_captain', captain] )
                        end_req_msg( task )
                        break
                    }
                    default:
                        break
                }
            }
        )
    }
}

export { wsConnect }