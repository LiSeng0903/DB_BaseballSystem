// import data 
import { depts } from "./data_depts.js"
import { teams as teamNames } from './data_teams.js'
import { chinese_names } from './data_chinese_names.js'
import { english_names } from './data_english_names.js'
import { relations } from "./data_relations.js"
import { positions } from "./data_positions.js"

const NAME_LANGUAGE = 'chinese'

const randChoose = ( lst ) => {
    let choice = lst[( Math.random() * lst.length ) | 0]
    return choice
}

const randomChooseMany = ( lst, chooseCnt ) => {
    let choices = []
    let i = 0
    while ( choices.length < chooseCnt ) {
        let curChoice = randChoose( lst )

        if ( choices.includes( curChoice ) == false ) {
            choices.push( curChoice )
        }
    }

    return choices
}

const range = ( start, end, step = 1 ) => {
    let r = []
    for ( let i = start; i < end; i += step ) {
        r.push( i )
    }
    return r
}

let SID_NUM = 0
const get_SID = () => {
    let SID = 'B099' + String( SID_NUM ).padStart( 5, '0' )
    SID_NUM += 1
    return SID
}

const get_phone = () => {
    let phone = []
    for ( let i = 0; i < 8; i++ ) {
        phone.push( String( randChoose( range( 0, 10 ) ) ) )
    }
    phone = '09' + phone.join( '' )
    return phone
}

const get_test_case = () => {
    let players = []
    let teams = []
    let managers = []
    let games = []
    let hitRecords = []
    let relatives = []
    let attendances = []
    let canPositions = []

    // Build teams  
    for ( let teamId = 0; teamId < teamNames.length; teamId++ ) {

        // Establish team
        teams.push( {
            TName: teamNames[teamId],
            Captain: ''
        } )

        let playerCnt = randChoose( range( 30, 60 ) )
        let managerCnt = randChoose( range( 3, 10 ) )

        for ( let i = 0; i < playerCnt; i++ ) {
            // Generate players 
            let newPlayer = {
                SID: get_SID(),
                PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
                Dept: randChoose( depts ),
                Grade: randChoose( range( 1, 5 ) ),
                Sex: randChoose( ['男', '女', '其他'] ),
                IsOB: randChoose( [true, false] ),
                JerNum: randChoose( range( 1, 100 ) ),
                Team: teamNames[teamId]
            }
            players.push( newPlayer )

            // Choose captain
            if ( i == 0 ) { teams[teamId].Captain = newPlayer.SID }

            // Generate players' relatives 
            let relativesCnt = randChoose( range( 0, 4 ) )
            for ( let j = 0; j < relativesCnt; j++ ) {
                let newRelative = {
                    SID: newPlayer.SID,
                    Relation: randChoose( relations ),
                    Phone: get_phone(),
                    Name: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names )
                }
                relatives.push( newRelative )
            }

            // Generate player's can position
            let canPositionCnt = randChoose( range( 2, 10 ) )
            let canPositionsList = randomChooseMany( positions, canPositionCnt )

            for ( let j = 0; j < canPositionsList.length; j++ ) {
                let newCanPosition = {
                    SID: newPlayer.SID,
                    Position: canPositionsList[j]
                }
                canPositions.push( newCanPosition )
            }
        }

        // Generate managers 
        for ( let i = 0; i < managerCnt; i++ ) {
            let newManager = {
                SID: get_SID(),
                PName: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names ),
                Dept: randChoose( depts ),
                Grade: randChoose( range( 1, 5 ) ),
                Sex: randChoose( ['男', '女', '其他'] ),
                Team: teamNames[teamId]
            }
            managers.push( newManager )
        }
    }

    console.log( canPositions )

    return {
        players: players,
        teams: teams,
        managers: managers,
        games: games,
        hitRecords: hitRecords,
        relatives: relatives,
        attendance: attendances,
        canPosition: canPositions
    }
}

get_test_case()