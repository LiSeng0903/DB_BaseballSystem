import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import styled from 'styled-components'


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

const items = [
  {
    label: '球隊',
    key: 'team',
    icon: <MailOutlined />,
    children: [
        {
            label: 'Option 1',
            key: 'team1',
        },
        {
            label: 'Option 2',
            key: 'setting:2',
        },
    ],
  },    
  {
    label: '賽程',
    key: 'schedule',
    icon: <AppstoreOutlined />,
  },
  {
    label: "戰積",
    key: 'score',
    icon: <MailOutlined />,
  },
];

const MainPage = () => {
  const [current, setCurrent] = useState('schedule');

  const onClick = (e) => {
    console.log('click ', e);
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