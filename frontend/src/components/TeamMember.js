import MemberCard from "./MemberCard"
import { useState, useEffect } from "react";
import styled from "styled-components"

const CardWrapper=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap
`

const TeamMember =() => {
    const [players, setPlayers] = useState([
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        },
        {
            SID: "B09705027",
            Pname: "Pusung",
            Dept: "資管",
            Grade: "三",
            Sex: "男的吧?",
            IsOB: "否",
            JerNum: "9",
            position: "i don't care",
            Team: 'ntuim'
        }
    ])

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