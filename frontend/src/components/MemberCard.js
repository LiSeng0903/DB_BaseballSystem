import styled from "styled-components"
import { Card } from 'antd';
import { Modal } from 'antd';
import { useState, useEffect } from "react";

import { useBaseball } from "../containers/hooks/useBaseball";


const CardStyle = styled(Card)`
    display: flex;
    flex-direction: column; 
    margin: 10px;
    width: 30%;
`
const MemberCard = ({member}) => {

    const { get_relatives, get_canPositions } = useBaseball();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
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
            <CardStyle title={member.JerNum?member.JerNum:'manager'} hoverable onClick={() => {
                showModal()}}>
                <h3>{member.PName}</h3>
            </ CardStyle>
            <Modal title="詳細資料" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>系級：{member.Dept + member.Grade}</p>
                <p>學號：{member.SID}</p>
                <p>性別：{member.Sex}</p>
                <p>守位：{member.position}</p>
            </Modal>
         </>
    )
}

export default MemberCard;