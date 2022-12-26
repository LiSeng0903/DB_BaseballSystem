import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../../model/models.js'

const get_game_stat = async ( teamName ) => {
    let history = await Game.aggregate( [
        { $match: { $or: [{ HomeTeam: teamName }, { AwayTeam: teamName }] } },
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
    return [[win, lose, tie], history]
}

const test = async () => {
    console.log( 'start testing' )

    let [[win, lose, tie], history] = await get_game_stat( '富邦悍將' )
    console.log( win )

    console.log( 'finish testing' )
}

export { test }