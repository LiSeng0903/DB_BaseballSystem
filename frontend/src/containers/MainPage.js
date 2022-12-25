import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import styled from 'styled-components'

import { useBaseball } from './hooks/useBaseball';


import Schedule from "./Schedule"
import TeamMember from "../components/TeamMember"

const TopBarStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%
`
const MenuStyle = styled(Menu)`
    width: 90%;
    display: flex;
    justify-content: space-evenly
`
const BarItemStyle = styled.div`
    display: flex;
    justify-content: center;
    margin: 3%;
    width: 100%
`

const MainPage = () => {
  const { items, teams, getTeams, getPeople } = useBaseball();
  const [current, setCurrent] = useState('schedule');

  useEffect(()=>{
    console.log(items);
  },[])

  

  const onClick = async (e) => {
    console.log('click ', e);

    switch (e.key){
      case "富邦悍將": {
        await getPeople("富邦悍將", "players")
        break;
      }

      case "統一獅": {
        await getPeople("統一獅", "players")
        break;
      }

      case "樂天桃猿": {
        await getPeople("樂天桃猿", "players")
        break;
      }

      case "味全龍": {
        await getPeople("味全龍", "players")
        break;
      }

      case "中信兄弟": {
        await getPeople("中信兄弟", "players")
        break;
      }

      case "台鋼雄鷹": {
        await getPeople("台鋼雄鷹", "players")
        break;
      }

      case "schedule": {
        break;
      }

      case "score": {
        break;
      }
    }

    setCurrent(e.key);
  };

    return(
      <>
        <TopBarStyle>
            <div>logo</div>
            <MenuStyle onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </TopBarStyle>
        <BarItemStyle >
            {current === "schedule" ? <Schedule /> : current === "score" ? null : <TeamMember/>}
        </BarItemStyle >
      </>
    )

};

export default MainPage; 