import mongoose from "mongoose"

const Schema = mongoose.Schema

const PlayerSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'], unique: true }, // PK
    PName: { type: String, required: [true, 'PName field missed'] },
    Dept: { type: String, required: [true, 'Dept field missed'] },
    Grade: { type: Number, required: [true, 'Grade field missed'] },
    Sex: { type: String, required: [true, 'Sex field missed'] },
    IsOB: { type: Boolean, required: [true, 'IsOB field missed'] },
    JerNum: { type: Number, required: [true, 'JerNum field missed'] },
    Team: { type: String, required: [true, 'Team field missed'] } // FK: Team.TName
} )

const TeamSchema = new Schema( {
    TName: { type: String, required: [true, 'TName field missed'] },
    Captain: { type: String, ref: 'player' } // FK: Student.SID
} )

const ManagerSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'], unique: true }, // PK
    PName: { type: String, required: [true, 'PName field missed'] },
    Dept: { type: String, required: [true, 'Dept field missed'] },
    Grade: { type: Number, required: [true, 'Grade field missed'] },
    Sex: { type: String, required: [true, 'Sex field missed'] },
    Team: { type: String, required: [true, 'Team field missed'] } // FK: Team.TName
} )

const GameSchema = new Schema( {
    GID: { type: Number, required: [true, 'GID field missed'], unique: true }, // PK
    GameDate: { type: Date, required: [true, 'Date field missed'] },
    HomeTeam: { type: String, required: [true, 'HomeTeam field missed'] }, // FK: Team.TName
    HomeScore: { type: Number, required: [true, 'HomeScore field missed'] },
    AwayTeam: { type: String, required: [true, 'AwayTeam field missed'] }, // FK: Team.TName
    AwayScore: { type: Number, required: [true, 'AwayScore field missed'] },
} )

const HitRecordSchema = new Schema( {
    GID: { type: Number, required: [true, 'GID field missed'] }, // PK, FK: Game.GID
    PAID: { type: Number, required: [true, 'PAID field missed'] }, // PK
    Result: { type: String, required: [true, 'Result field missed'] },
    Pitcher: { type: String, required: [true, 'Pitcher field missed'] },
    Hitter: { type: String, required: [true, 'Hitter field missed'] }
} )

const RelativesSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'] }, // PK: Player.SID
    Relation: { type: String, required: [true, 'Relation field missed'] }, // PK
    Phone: { type: String, required: [true, 'Phone field missed'] },
    Name: { type: String, required: [true, 'Name field missed'] },
} )

const AttendanceSchema = new Schema( {
    GID: { type: Number, required: [true, 'GID field missed'] }, // PK, FK: Game.GID
    SID: { type: String, required: [true, 'SID field missed'] }, // PK, FK: Player.SID
    Position: { type: String, required: [true, 'Position field missed'] },
} )

const CanPositionSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'] }, // PK, FK: Player.SID
    Position: { type: String, required: [true, 'Position field missed'] } // PK
} )

const Player = mongoose.model( 'player', PlayerSchema )
const Team = mongoose.model( 'team', TeamSchema )
const Manager = mongoose.model( 'manager', ManagerSchema )
const Game = mongoose.model( 'game', GameSchema )
const HitRecord = mongoose.model( 'hitRecord', HitRecordSchema )
const Relatives = mongoose.model( 'relatives', RelativesSchema )
const Attendance = mongoose.model( 'attendance', AttendanceSchema )
const CanPosition = mongoose.model( 'canPosition', CanPositionSchema )

export { Player, Team, Manager, Game, HitRecord, Relatives, Attendance, CanPosition }