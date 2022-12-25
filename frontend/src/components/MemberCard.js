import styled from "styled-components"
import { Card } from 'antd';
import { Modal } from 'antd';
import { useState, useEffect } from "react";


const CardStyle = styled(Card)`
    display: flex;
    flex-direction: column; 
    margin: 10px;
    width: 30%;
`
const MemberCard = ({player}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        console.log("aa")
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <CardStyle title={player.JerNum} hoverable onClick={() => showModal()}>
                <h3>{player.Pname}</h3>
            </ CardStyle>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>系級：{player.Dept + player.Grade}</p>
                <p>學號：{player.SID}</p>
                <p>性別：{player.Sex}</p>
                <p>是否為OB：{player.IsOB}</p>
                <p>守位：{player.position}</p>
            </Modal>
         </>
    )
}

export default MemberCard;