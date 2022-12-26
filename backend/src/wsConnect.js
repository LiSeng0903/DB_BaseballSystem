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

const get_game_stat = async ( teamName ) => {
    let history = await Game.aggregate( [
        { $match: { $or: [{ HomeTeam: teamName }, { AwayTeam: teamName }] } },
        { $addFields: { "year": { $year: '$GameDate' } } },
        { $addFields: { "month": { $month: '$GameDate' } } },
        { $addFields: { "day": { $dayOfMonth: '$GameDate' } } },
        { $sort: { GameDate: 1 } }
    ] )

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
    return [[win, lose, tie, winRate], history]
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
                            { $addFields: { "month": { $month: '$GameDate' } } },
                            { $addFields: { "day": { $dayOfMonth: '$GameDate' } } },
                            { $match: { year: year } },
                            { $match: { month: month } },
                            { $sort: { GameDate: 1 } }
                        ] )

                        sendData( clientWS, ['rp_get_games', games] )
                        break
                    }
                    case 'get_score': {
                        let teamName = payload
                        let [[win, lose, tie, winRate], history] = await get_game_stat( teamName )
                        let score = {
                            win: win,
                            lose: lose,
                            tie: tie,
                            total: win + lose + tie,
                            winRate: winRate
                        }

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