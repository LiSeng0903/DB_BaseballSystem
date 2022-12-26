import MemberCard from "./MemberCard"
import { useState, useEffect } from "react";
import styled from "styled-components"
import ScrollToTop from "react-scroll-to-top";

const MemberWrapper=styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 3%;
`
const CardWrapper=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap
`

const TeamMember =({ players, captain, managers }) => {
    useEffect(() => {

    }, [])
    return(
        <MemberWrapper>
            <h2>Captain</h2>
            <CardWrapper>
                <MemberCard member={captain}/>
            </CardWrapper>
            <h2>Players</h2>
            <CardWrapper>
            {players.map((player) => {
                return (
                    <MemberCard member={player}/>
                )
            })}
            </CardWrapper>
            <h2>Manegers</h2>
            <CardWrapper>
            {managers.map((manager) => {
                return (
                    <MemberCard member={manager}/>
                )
            })}
            </CardWrapper>
            <ScrollToTop smooth />
        </MemberWrapper>
    )
}

export default TeamMember;