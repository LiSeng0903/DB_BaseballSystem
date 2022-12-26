import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../../model/models.js'

const test = async () => {
    console.log( 'start testing' )
    let GID = 4
    let hitRecords = await HitRecord.aggregate( [
        { $match: { GID: GID } },
        { $sort: { PAID: 1 } }
    ] )

    for ( let i = 0; i < hitRecords.length; i++ ) {
        hitRecords[i].Pitcher = await Player.findOne( { SID: hitRecords[i].Pitcher } ).select( 'PName' )
        hitRecords[i].Pitcher = hitRecords[i].Pitcher.PName
        hitRecords[i].Hitter = await Player.findOne( { SID: hitRecords[i].Hitter } ).select( 'PName' )
        hitRecords[i].Hitter = hitRecords[i].Hitter.PName
    }

    console.log( hitRecords )
    console.log( 'finish testing' )
}
export { test }