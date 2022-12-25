import mongoose from "mongoose"

const Schema = mongoose.Schema

const PlayerSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'], unique: true },
    PName: { type: String, required: [true, 'PName field missed'] },
    Dept: { type: String, required: [true, 'Dept field missed'] },
    Grade: { type: Number, required: [true, 'Grade field missed'] },
    Sex: { type: String, required: [true, 'Sex field missed'] },
    IsOB: { type: Boolean, required: [true, 'IsOB field missed'] },
    JerNum: { type: Number, required: [true, 'JerNum field missed'] },
    Team: { type: Schema.Types.ObjectId, ref: 'team', required: [true, 'Team field missed'] } // to be fixed 
} )

const TeamSchema = new Schema( {
    TName: { type: String, required: [true, 'TName field missed'] },
    Captain: { type: Schema.Types.ObjectId, ref: 'player' }
} )

const ManagerSchema = new Schema( {
    SID: { type: String, required: [true, 'SID field missed'], unique: true },
    PName: { type: String, required: [true, 'PName field missed'] },
    Dept: { type: String, required: [true, 'Dept field missed'] },
    Grade: { type: Number, required: [true, 'Grade field missed'] },
    Sex: { type: String, required: [true, 'Sex field missed'] },
    Team: { type: Schema.Types.ObjectId, ref: 'team', required: [true, 'Team field missed'] } // to be fixed 
} )

const GameSchema = new Schema( {
    GID: { type: Number, required: [true, 'GID field missed'] },
    Date: { type: Date, required: [true, 'Date field missed'] },
    HomeTeam: { type: Schema.Types.ObjectId, ref: 'team', required: [true, 'HomeTeam field missed'] },
    HomeScore: { type: Number, required: [true, 'HomeScore field missed'] },
    AwayTeam: { type: Schema.Types.ObjectId, ref: 'team', required: [true, 'AwayTeam field missed'] },
    AwayScore: { type: Number, required: [true, 'AwayScore field missed'] },
} )

const HitRecordSchema = new Schema( {
    GID: { type: Schema.Types.ObjectId, ref: 'game', required: [true, 'GID field missed'] },
    PAID: { type: Number, required: [true, 'PAID field missed'] },
    Result: { type: String, required: [true, 'Result field missed'] },
    Pitcher: { type: Schema.Types.ObjectId, ref: 'player', required: [true, 'Pitcher field missed'] },
    Hitter: { type: Schema.Types.ObjectId, ref: 'player', required: [true, 'Hitter field missed'] }
} )

const RelativesSchema = new Schema( {
    SID: { type: Schema.Types.ObjectId, ref: 'player', required: [true, 'SID field missed'] },
    Relation: { type: String, required: [true, 'Relation field missed'] },
    Phone: { type: String, required: [true, 'Phone field missed'] },
    Name: { type: String, required: [true, 'Name field missed'] },
} )

const AttendanceSchema = new Schema( {
    GID: { type: Schema.Types.ObjectId, ref: 'game', required: [true, 'GID field missed'] },
    SID: { type: Schema.Types.ObjectId, ref: 'player', required: [true, 'SID field missed'] },
    Position: { type: String, required: [true, 'Position field missed'] },
} )

const CanPositionSchema = new Schema( {
    SID: { type: Schema.Types.ObjectId, ref: 'player', required: [true, 'SID field missed'] },
    Position: { type: String, required: [true, 'Position field missed'] }
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