import mongoose from "mongoose"
import { chinese_names } from './data/data_chinese_names.js'
import { english_names } from './data/data_english_names.js'
import { depts } from "./data/data_depts.js"
import { teams as teamNames } from './data/data_teams.js'
import { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition } from '../../model/models.js'

const PLAYER_CNT = 300
const MANAGER_CNT = 50
const GAME_CNT = 50
const RECORD_CNT = 10
const NAME_LANGUAGE = 'chinese'

const initData = async () => {

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

    // Players 
    let players = []
    for ( let i = 0; i < teamNames.length; i++ ) { // Captains 
        players.push( {
            SID: 'B09905' + String( i ).padStart( 3, '0' ),
            PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
            Dept: randChoose( depts ),
            Grade: randChoose( range( 1, 5 ) ),
            Sex: randChoose( ['男', '女', '其他'] ),
            IsOB: randChoose( [true, false] ),
            JerNum: randChoose( range( 1, 100 ) ),
            Team: teamNames[i]
        } )
    }
    for ( let i = 0; i < PLAYER_CNT; i++ ) {
        players.push( {
            SID: 'B09705' + String( i ).padStart( 3, '0' ),
            PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
            Dept: randChoose( depts ),
            Grade: randChoose( range( 1, 5 ) ),
            Sex: randChoose( ['男', '女', '其他'] ),
            IsOB: randChoose( [true, false] ),
            JerNum: randChoose( range( 1, 100 ) ),
            Team: randChoose( teamNames )
        } )
    }
    await Player.deleteMany( {} )
    await Player.insertMany( players )

    // Team 
    let teams = []
    for ( let i = 0; i < teamNames.length; i++ ) {
        teams.push( {
            TName: teamNames[i],
            Captain: players[i].SID
        } )
    }

    await Team.deleteMany( {} )
    await Team.insertMany( teams )

    // Managers 
    let managers = []
    for ( let i = 0; i < MANAGER_CNT; i++ ) {
        managers.push( {
            SID: 'B09805' + String( i ).padStart( 3, '0' ),
            PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
            Dept: randChoose( depts ),
            Grade: randChoose( range( 1, 5 ) ),
            Sex: randChoose( ['男', '女', '其他'] ),
            Team: randChoose( teamNames )
        } )
    }
    await Manager.deleteMany( {} )
    await Manager.insertMany( managers )

    // Game
    let games = []
    for ( let i = 0; i < GAME_CNT; i++ ) {
        games.push( {
            GID: i,
            GameDate: '2022-' + String( randChoose( range( 10, 13 ) ) ) + '-' + String( randChoose( range( 1, 32 ) ) ),
            GameDate: '2022-' + String( randChoose( range( 10, 13 ) ) ) + '-' + String( randChoose( range( 1, 32 ) ) ),
            HomeTeam: randChoose( teamNames ),
            HomeScore: randChoose( range( 0, 10 ) ),
            AwayTeam: randChoose( teamNames ),
            AwayScore: randChoose( range( 0, 10 ) ),
        } )
    }
    await Game.deleteMany( {} )
    await Game.insertMany( games )

    console.log( 'data init' )
}

export { initData }