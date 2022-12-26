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

                start_req_msg( task )

                switch ( task ) {
                    case 'get_teams': {
                        let teamNames = []
                        let teams = await Team.find( {} )
                        for ( let i = 0; i < teams.length; i++ ) {
                            teamNames.push( teams[i].TName )
                        }
                        sendData( clientWS, ['rp_get_teams', teamNames] )
                        break
                    }
                    case 'get_team_players': {
                        let teamName = payload
                        let teamPlayers = await Player.aggregate( [
                            { $match: { Team: teamName } },
                            { $sort: { JerNum: 1 } }
                        ] )
                        sendData( clientWS, ['rp_get_team_players', teamPlayers] )
                        break
                    }
                    case 'get_team_managers': {
                        let teamName = payload
                        let teamManagers = await Manager.find( { Team: teamName } )
                        sendData( clientWS, ['rp_get_team_managers', teamManagers] )
                        break
                    }
                    case 'get_team_captain': {
                        let teamName = payload
                        let targetTeam = await Team.findOne( { TName: teamName } )
                        let captain = await Player.findOne( { SID: targetTeam.Captain } )
                        sendData( clientWS, ['rp_get_team_captain', captain] )
                        break
                    }
                    case 'get_games': {
                        let [year, month] = payload
                        let games = await Game.aggregate( [
                            { $addFields: { "year": { $year: '$GameDate' } } },
                            { $match: { year: year } },
                            { $addFields: { "month": { $month: '$GameDate' } } },
                            { $match: { month: month } },
                            { $sort: { GameDate: 1 } }
                        ] )

                        sendData( clientWS, ['rp_get_games', games] )
                        break
                    }
                    case 'get_score': {
                        let teamName = payload
                        let score = {
                            win: 10,
                            lost: 10,
                            winRate: 10
                        }
                        let history = await Game.find( {} )

                        sendData( clientWS, ['rp_get_score', [score, history]] )
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

export { wsConnect }