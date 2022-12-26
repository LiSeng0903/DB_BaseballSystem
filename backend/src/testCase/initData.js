import mongoose from "mongoose"
import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../../model/models.js'
import { get_test_case } from "./get_better_test_data.js"

const initData = async () => {
    let { players, teams, managers, games, hitRecords, relatives, attendances, canPositions } = get_test_case()

    await Player.deleteMany( {} )
    await Player.insertMany( players )

    await Team.deleteMany( {} )
    await Team.insertMany( teams )

    await Manager.deleteMany( {} )
    await Manager.insertMany( managers )

    await Game.deleteMany( {} )
    await Game.insertMany( games )

    await HitRecord.deleteMany( {} )
    await HitRecord.insertMany( hitRecords )

    await Relatives.deleteMany( {} )
    await Relatives.insertMany( relatives )

    await Attendance.deleteMany( {} )
    await Attendance.insertMany( attendances )

    await CanPosition.deleteMany( {} )
    await CanPosition.insertMany( canPositions )

    console.log( 'Data inited' )
}

export { initData }