// import data 
let depts = require( './data/data_depts.js' ).depts
let teamNames = require( './data/data_teams.js' ).teams
let chinese_names = require( './data/data_chinese_names.js' ).chinese_names
let english_names = require( './data/data_english_names.js' ).english_names
let relations = require( './data/data_relations.js' ).relations
let positions = require( './data/data_positions.js' ).positions

const NAME_LANGUAGE = 'chinese'

class Game {
    constructor( teamNames, players, canPositions ) {
        // set basic info
        let battleTeam = randomChooseMany( teamNames, 2 )
        this.GID = get_GID()
        this.GameDate = '2022-' + String( randChoose( range( 1, 13 ) ) ).padStart( 2, '0' ) + '-' + String( randChoose( range( 1, 28 ) ) ).padStart( 2, '0' )
        this.HomeTeam = battleTeam[0]
        this.HomeScore = 0
        this.AwayTeam = battleTeam[1]
        this.AwayScore = 0

        this.hitRecord = []
        this.attendance = []

        this.homeSIDs = []
        this.awaySIDs = []
        this.homeCanPos = []
        this.AwayCanPos = []

        this.homeLineUp = []
        this.awayLineUp = []

        for ( let i = 0; i < players.length; i++ ) {
            if ( players[i].Team == this.HomeTeam ) {
                this.homeSIDs.push( players[i].SID )
            }
            else if ( players[i].Team == this.AwayTeam ) {
                this.awaySIDs.push( players[i].SID )
            }
        }

        for ( let i = 0; i < canPositions.length; i++ ) {
            if ( this.homeSIDs.includes( canPositions[i].SID ) ) {
                this.homeCanPos.push( canPositions[i] )
            }
            else if ( this.awaySIDs.includes( canPositions[i].SID ) ) {
                this.AwayCanPos.push( canPositions[i] )
            }
        }
    }

    line_up() {
        for ( let i = 0; i < positions.length; i++ ) {
            let curPos = positions[i]

            for ( let i = 0; i < 1000; i++ ) {
                let curCanP = randChoose( this.homeCanPos )
                if ( curCanP.Position == curPos && this.homeLineUp.includes( curCanP.SID ) == false ) {
                    this.homeLineUp.push( curCanP.SID )
                    break
                }
            }
            for ( let i = 0; i < 1000; i++ ) {
                let curCanP = randChoose( this.AwayCanPos )
                if ( curCanP.Position == curPos && this.awayLineUp.includes( curCanP.SID ) == false ) {
                    this.awayLineUp.push( curCanP.SID )
                    break
                }
            }

        }

        for ( let i = 0; i < this.homeLineUp.length; i++ ) {
            this.attendance.push( {
                GID: this.GID,
                SID: this.homeLineUp[i],
                Position: positions[i]
            } )

            this.attendance.push( {
                GID: this.GID,
                SID: this.awayLineUp[i],
                Position: positions[i]
            } )
        }
        return
    }

    playGame() {
        // line up
        this.line_up()

        // play game 
        let PA = 0
        let hitterIndex = [0, 0]
        for ( let inning = 1; inning <= 9; inning++ ) {
            for ( let half = 0; half < 2; half++ ) {
                let out = 0
                let pitcherSID = ( half == 0 ? this.awayLineUp[0] : this.homeLineUp[0] )
                let base = 0
                while ( out < 3 ) {
                    PA += 1
                    let hitterSID = ( half == 0 ? this.homeLineUp[hitterIndex[half]] : this.awayLineUp[hitterIndex[half]] )
                    hitterIndex[half] = ( hitterIndex[half] + 1 ) % 9

                    // Hit 
                    let hitResult = randChoose( ['H', 'H', 'O', 'O', 'O'] )
                    if ( hitResult == 'H' ) {
                        base += 1
                    }
                    else {
                        out += 1
                    }

                    // Append result 
                    this.hitRecord.push( {
                        GID: this.GID,
                        PAID: PA,
                        Result: hitResult,
                        Pitcher: pitcherSID,
                        Hitter: hitterSID
                    } )
                }

                if ( half == 0 ) {
                    this.HomeScore += Math.max( base - 3, 0 )
                }
                else {
                    this.AwayScore += Math.max( base - 3, 0 )
                }
            }
        }
    }

    get_hit_record() {
        return this.hitRecord
    }

    get_game() {
        return {
            GID: this.GID,
            GameDate: this.GameDate,
            HomeScore: this.HomeScore,
            HomeTeam: this.HomeTeam,
            AwayScore: this.AwayScore,
            AwayTeam: this.AwayTeam,
        }
    }

    get_attendance() {
        return this.attendance
    }

}

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

let GID_NUM = 0
const get_GID = () => {
    let GID = GID_NUM
    GID_NUM += 1
    return GID
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
            let tempRels = randomChooseMany( relations, relativesCnt )
            for ( let j = 0; j < relativesCnt; j++ ) {
                let newRelative = {
                    SID: newPlayer.SID,
                    Relation: tempRels[j],
                    Phone: get_phone(),
                    Name: randChoose( NAME_LANGUAGE == 'chinese' ? chinese_names : english_names )
                }
                relatives.push( newRelative )
            }

            // Generate player's can position
            let canPositionCnt = randChoose( range( 2, 5 ) )
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

    // play games 
    for ( let i = 0; i < 300; i++ ) {
        let game = new Game( teamNames, players, canPositions )
        game.playGame()

        // Game 
        games.push( game.get_game() )

        // Hit record 
        hitRecords = hitRecords.concat( game.get_hit_record() )

        // attendance 
        attendances = attendances.concat( game.get_attendance() )
    }

    return {
        players: players,
        teams: teams,
        managers: managers,
        games: games,
        hitRecords: hitRecords,
        relatives: relatives,
        attendances: attendances,
        canPositions: canPositions
    }
}

module.exports = {
    get_test_case: get_test_case
}