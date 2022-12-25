import mongoose from "mongoose"
import { chinese_names } from './chinese_names.js'
import { english_names } from './english_names.js'
import { depts } from "./depts.js"
import { teams as teamNames } from './teams.js'
import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../model/models.js'

const PLAYER_CNT = 300
const MANAGER_CNT = 50
const GAME_CNT = 50
const RECORD_CNT = 10
const NAME_LANGUAGE = 'chinese'

const initData = async () => {
    const getTeamId = async ( TName ) => {
        let team = await Team.findOne( { TName: TName } )
        let teamId = team._id.toString()
        return teamId
    }

    const getGameId = async ( GID ) => {
        let game = await game.findOne( { GID: GID } )
        let gameId = game._id.toString()
        return gameId
    }

    const randChoose = ( lst ) => {
        let choice = lst[( Math.random() * lst.length ) | 0]
        return choice
    }

    const range = ( start, end, step = 1 ) => {
        let r = []
        for ( let i = start; i < end; i += step ) {
            r.push( i )
        }
        return r
    }

    // Team 
    let teams = []
    for ( let i = 0; i < teamNames.length; i++ ) {
        teams.push( { TName: teamNames[i] } )
    }
    await Team.deleteMany( {} )
    await Team.insertMany( teams )

    // Players 
    let players = []
    for ( let i = 0; i < PLAYER_CNT; i++ ) {
        players.push( {
            SID: 'B09705' + String( i ).padStart( 3, '0' ),
            PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
            Dept: randChoose( depts ),
            Grade: randChoose( range( 1, 5 ) ),
            Sex: randChoose( ['男', '女', '其他'] ),
            IsOB: randChoose( [true, false] ),
            JerNum: randChoose( range( 1, 100 ) ),
            Team: await getTeamId( randChoose( teamNames ) )
        } )
    }
    await Player.deleteMany( {} )
    await Player.insertMany( players )

    // Managers 
    let managers = []
    for ( let i = 0; i < MANAGER_CNT; i++ ) {
        managers.push( {
            SID: 'B09805' + String( i ).padStart( 3, '0' ),
            PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
            Dept: randChoose( depts ),
            Grade: randChoose( range( 1, 5 ) ),
            Sex: randChoose( ['男', '女', '其他'] ),
            Team: await getTeamId( randChoose( teamNames ) )
        } )
    }
    await Manager.deleteMany( {} )
    await Manager.insertMany( managers )

    // GameSchema
    let games = []
    for ( let i = 0; i < GAME_CNT; i++ ) {
        games.push( {
            GID: i,
            Date: '2022-' + String( randChoose( range( 10, 13 ) ) ) + '-' + String( randChoose( range( 1, 32 ) ) ),
            HomeTeam: await getTeamId( randChoose( teamNames ) ),
            HomeScore: randChoose( range( 0, 10 ) ),
            AwayTeam: await getTeamId( randChoose( teamNames ) ),
            AwayScore: randChoose( range( 0, 10 ) ),
        } )
    }
    await Game.deleteMany( {} )
    await Game.insertMany( games )

    // Hit record
    // let hitRecords = []
    // for ( let i = 0; i < RECORD_CNT; i++ ) {
    //     GID: await getGameId( randChoose( range( 1, GAME_CNT + 1 ) ) ),
    //         PAID: ra,
    //             Result: randChoose( ['H', 'BB', 'O'] ),
    //                 Pitcher: ,
    //     Hitter: ,
    // }

    console.log( 'data init' )
}

export { initData }