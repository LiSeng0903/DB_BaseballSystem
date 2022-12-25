import http from 'http'
import express from 'express'
import mongoose from "mongoose"
import WebSocket from 'ws'

import mongo from './mongo.js'
import { initData } from "../testCase/initData.js"
import { wsConnect } from "./wsConnect.js"
import { test } from "../testCase/webSocketTest.js"

const INIT = false
const TEST = true
const SERVER_IP = 'localhost'

mongo.connect()

const app = express()
const server = http.createServer( app )
const serverWS = new WebSocket.Server( { server } )
const db = mongoose.connection

const PORT = 4000
server.listen( PORT, SERVER_IP, () => { console.log( `Listening on ${SERVER_IP}:${PORT}` ) } )

db.once( 'open', () => {
    console.log( 'db connected' )
    if ( INIT == true ) { initData() }
    if ( TEST == true ) { test() }

    serverWS.on( 'connection', ( clientWS ) => {
        console.log( 'client connected' )
        clientWS.onmessage = wsConnect.onMessage( serverWS, clientWS )
    } )
} )