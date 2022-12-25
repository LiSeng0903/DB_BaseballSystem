import { Team } from "../model/models.js"

const test = async () => {
    console.log( 'start testing' )
    let team = await Team.find( {} )
    console.log( 'finish testing' )
    return team
}

export { test }