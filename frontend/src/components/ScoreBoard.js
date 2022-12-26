import React from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components'

const { Panel } = Collapse;

const CollapseStyle = styled(Collapse)`
    width:80%;
    margin:3%
`
const ScoreBoard = ({teams}) =>{
    return(
        <CollapseStyle accordion>
            {teams.map((team) => (
                <Panel header={team}>
                    <p>aaaa</p>
                </Panel>
            ))}
        </CollapseStyle>
      );
}
export default ScoreBoard;