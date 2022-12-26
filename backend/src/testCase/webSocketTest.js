import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../../model/models.js'

const test = async () => {
    console.log( 'start testing' )

    let year = 2022
    let month = 12
    let games = await Game.aggregate( [
        { $addFields: { "month": { $month: '$GameDate' } } },
        { $addFields: { "year": { $year: '$GameDate' } } },
        { $match: { year: year } },
        { $match: { month: month } },
        { $sort: { GameDate: 1 } }
    ] )
    console.log( games )
    console.log( games.length )

    console.log( 'finish testing' )
}

export { test }