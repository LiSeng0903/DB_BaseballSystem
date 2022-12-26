import React from 'react';
import { Collapse, Space, Table, Tag, Card, Modal} from 'antd';
import styled from 'styled-components'
import { useBaseball } from '../containers/hooks/useBaseball';
import { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const CollapseStyle = styled(Collapse)`
    width:80%;
    margin:3%
`
  
const ScoreBoard = ({teams}) =>{
    const { scores, historyGames, hitRecords, get_score, get_hitRecords } = useBaseball();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const showModal = (historyGame) => {
        setIsModalOpen(true);
        console.log("ID",historyGame.GID)
        get_hitRecords(historyGame.GID);
        console.log("Record",hitRecords)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //console.log("h",historyGames)
    return(
        <CollapseStyle accordion>
            {teams.map((team) => (
                <Panel header={team} onClick={()=>{
                    get_score(team);
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}>
                    <Table dataSource={[scores]} pagination={false}>
                        <Column title="總場數" dataIndex="total" />
                        <Column title="勝" dataIndex="win" />
                        <Column title="敗" dataIndex="lose" />
                        <Column title="和" dataIndex="tie" />
                        <Column title="勝率" dataIndex="winRate"/>
                    </Table>
                    {
                        historyGames.map((historyGame)=>(
                            <Card style={{margin:"2%"}} hoverable onClick={() => showModal(historyGame)}>
                                <p>{historyGame.year} / {historyGame.month} / {historyGame.day}</p>
                                <p>{historyGame.AwayTeam}  <strong>{historyGame.AwayScore}-{historyGame.HomeScore}</strong> {historyGame.HomeTeam}</p>
                            </Card>
                        ))
                    }
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Table dataSource={hitRecords}>
                            <Column title="打席" dataIndex="PAID" />
                            <Column title="打者" dataIndex="Hitter" />
                            <Column title="投手" dataIndex="Pitcher" />
                            <Column title="結果" dataIndex="Result" />
                        </Table>
                    </Modal>
                </Panel>
            ))}
            <ScrollToTop smooth />
        </CollapseStyle>
      );
}
export default ScoreBoard;