import styled from "styled-components"
import { Card } from 'antd';


// const Card = styled.div`
//     height: 200px;
//     width: 200px;
//     border-radius: 10%;
//     background-color: pink;
//     display: flex;
//     flex-direction: column; 
// `

const Row = styled.p`
    height: 10px;
    extIndent: 1100px;
    lineHeight: 0.5;
    margin: 10px;
`

const MemberCard = ({player}) => {
    return (
        <Card title={player.Pname}>
            <p>系級：{player.Dept + player.Grade}</p>
            <p>學號：{player.SID}</p>
            <p>背號：{player.JerNum}</p>
            <p>性別：{player.Sex}</p>
            <p>是否為OB：{player.IsOB}</p>
            <p>守位：{player.position}</p>
        </Card>
    )
}

export default MemberCard;