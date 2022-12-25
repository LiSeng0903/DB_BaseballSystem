import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../model/models.js'

const test = async () => {
    console.log( 'start testing' )
    let teamName = '富邦悍將'
    let targetTeam = await Team.findOne( { TName: teamName } )
    let captain = await Player.findOne( { SID: targetTeam.Captain } )
    console.log( captain )
    console.log( 'finish testing' )
}

export { test }