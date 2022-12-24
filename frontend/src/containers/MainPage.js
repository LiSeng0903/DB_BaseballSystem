import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd'; 
import styled from 'styled-components'

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

const items: MenuProps['items'] = [
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

const MianPge = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>  
        <TopBarStyle>
            <div>logo</div>
            <MenuStyle onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </TopBarStyle>
        <div>aaa</div>
    </>
  );
};

export default MianPge;