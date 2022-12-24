import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styled from 'styled-components'

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

const items = [
  {
    label: '球隊',
    key: 'team',
    icon: <MailOutlined />,
    children: [
        {
            label: 'Option 1',
            key: 'setting:1',
        },
        {
            label: 'Option 2',
            key: 'setting:2',
        },
    ],
  },    
  {
    label: '賽程',
    key: 'shcedule',
    icon: <AppstoreOutlined />,
  },
  {
    label: "戰積",
    key: 'score',
    icon: <MailOutlined />,
  },
];

const MainPage = () => {
  const [current, setCurrent] = useState('mail');

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
        <TeamMember/>
    </>
    )

};

export default MainPage;