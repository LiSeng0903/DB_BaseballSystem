import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import styled from 'styled-components'

import { useBaseball } from './hooks/useBaseball';


import Schedule from "../components/Schedule"
import TeamMember from "../components/TeamMember"
import ScoreBoard from "../components/ScoreBoard"

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
  const { items, teams, players, captain, managers, getTeams, getPeople, get_schedule } = useBaseball();
  const [current, setCurrent] = useState('');

  useEffect(()=>{
    console.log(items);
  },[])


  const onClick = async (e) => {
    console.log('click ', e);

    switch (e.key){
      case "富邦悍將": {
        await getPeople("富邦悍將", "captain")
        await getPeople("富邦悍將", "players")
        await getPeople("富邦悍將", "managers")
        break;
      }

      case "統一獅": {
        await getPeople("統一獅", "captain")
        await getPeople("統一獅", "players")
        await getPeople("統一獅", "managers")
        break;
      }

      case "樂天桃猿": {
        await getPeople("樂天桃猿", "captain")
        await getPeople("樂天桃猿", "players")
        await getPeople("樂天桃猿", "managers")
        break;
      }

      case "味全龍": {
        await getPeople("味全龍", "captain")
        await getPeople("味全龍", "players")
        await getPeople("味全龍", "managers")
        break;
      }

      case "中信兄弟": {
        await getPeople("中信兄弟", "captain")
        await getPeople("中信兄弟", "players")
        await getPeople("中信兄弟", "managers")
        break;
      }

      case "台鋼雄鷹": {
        await getPeople("台鋼雄鷹", "captain")
        await getPeople("台鋼雄鷹", "players")
        await getPeople("台鋼雄鷹", "managers")
        break;
      }

      case "schedule": {
        const date = new Date()
        await get_schedule(date.getFullYear(), date.getMonth()+1)
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
            {current === '' ? <h1>Welcome to our Baseball DB!</h1> : current === "schedule" ? <Schedule /> : current === "score" ? <ScoreBoard teams={teams} /> : <TeamMember players={players} captain={captain} managers={managers}/>}
        </BarItemStyle >
      </>
    )

};

export default MainPage; 