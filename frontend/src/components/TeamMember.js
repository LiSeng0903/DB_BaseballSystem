import MemberCard from "./MemberCard"
import { useState, useEffect } from "react";
import styled from "styled-components"

const CardWrapper=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap
`

const TeamMember =({ players, captain, managers }) => {
    useEffect(() => {

    }, [])
    console.log("p",players, "c",captain, "m",managers)
    return(
        <CardWrapper>

            <h2>Captain</h2>
            <MemberCard member={captain}/>
            <h2>Players</h2>
            {players.map((player) => {
                return (
                    <MemberCard member={player}/>
                )
            })}
            <h2>Manegers</h2>
            {managers.map((manager) => {
                return (
                    <MemberCard member={manager}/>
                )
            })}
        </CardWrapper>
    )
}

export default TeamMember;