import MemberCard from "./MemberCard"
import { useState, useEffect } from "react";
import styled from "styled-components"

const CardWrapper=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap
`

const TeamMember =({ players }) => {
    useEffect(() => {

    }, [])

    return(
        <CardWrapper>
            {players.map((player) => {
                return (
                    <MemberCard player={player}/>
                )
            })}
        </CardWrapper>
    )
}

export default TeamMember;