import React, { useRef } from 'react';
import { Collapse, Space, Table, Tag, Card} from 'antd';
import styled from 'styled-components'
import { useBaseball } from '../containers/hooks/useBaseball';

const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const CollapseStyle = styled(Collapse)`
    width:80%;
    margin:3%
`

  
const ScoreBoard = ({teams}) =>{
    const { scores, historyGames, get_score } = useBaseball();

    return(
        <CollapseStyle accordion>
            {teams.map((team, i) => (
                <Panel header={team} onClick={()=>{
                    get_score(team)
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
                            <Card style={{margin:"2%"}} hoverable>
                                <p>{historyGame.year} / {historyGame.month} / {historyGame.day}</p>
                                <p>{historyGame.AwayTeam}  <strong>{historyGame.AwayScore}-{historyGame.HomeScore}</strong> {historyGame.HomeTeam}</p>
                            </Card>
                        ))
                    }
                </Panel>
            ))}
        </CollapseStyle>
      );
}
export default ScoreBoard;