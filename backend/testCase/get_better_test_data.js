// import data 
import { depts } from "./data_depts.js"
import { teams as teamNames } from './data_teams.js'
import { chinese_names } from './data_chinese_names.js'
import { english_names } from './data_english_names.js'

const NAME_LANGUAGE = 'chinese'

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
    let attendance = []
    let canPosition = []

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
                relatives.push( {
                    SID: newPlayer.SID,
                    Relation: randChoose( ['父', '母', '兄', '弟', '姊', '妹'] ),
                    Phone: get_phone(),
                    Name: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names )
                } )
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
        }
    }


    return {
        players: players,
        teams: teams,
        managers: managers,
        games: games,
        hitRecords: hitRecords,
        relatives: relatives,
        attendance: attendance,
        canPosition: canPosition
    }
}