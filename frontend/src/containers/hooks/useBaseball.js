import { useState, createContext, useContext, useEffect } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const client = new WebSocket('ws://192.168.1.154:4000/')

client.onopen = () => {
    sendData(["get_teams"]);
}

const sendData = async (data) => {
    await client.send(JSON.stringify(data));
}

const BaseballContext = createContext({
    items: [],
    teams: [],
    players: [],
    captain: [],
    managers: [],
})

const BaseballProvider = (props) => {
    const [items, setItems] = useState([
        {
          label: '球隊',
          key: 'team',
          icon: <MailOutlined />,
          children: [
              {
                label: "富邦悍將",
                key: "富邦悍將"
              },
              {
                label: "統一獅",
                key: "統一獅"
              },
              {
                label: "樂天桃猿",
                key: "樂天桃猿"
              },
              {
                label: "味全龍",
                key: "味全龍"
              },
              {
                label: "中信兄弟",
                key: "中信兄弟"
              },
              {
                label: "台鋼雄鷹",
                key: "台鋼雄鷹"
              }
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
      ])
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [captain, setCaptain] = useState([]);
    const [managers, setManagers] = useState([]);

    const getTeams = () => {
        sendData(["get_teams"]);
        console.log("send request")
    }

    const get_team_players = (teamName) => {
        sendData(["get_team_players", teamName])
    }

    const get_team_captain = (teamName) => {
        sendData(["get_team_captain", teamName])
    }

    const get_team_managers = (teamName) => {
        sendData(["get_team_managers", teamName])
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "rp_get_teams": {
                setTeams(payload);
                break;
            }

            case "rp_get_team_players": {
                setPlayers(payload);
                break;
            }

            case "rp_get_team_captain": {
                setCaptain(payload);
                break;
            }

            case "rp_get_team_managers": {
                setManagers(payload);
                break;
            }
        }
    }

    return (
        <BaseballContext.Provider
            value={{
                items,
                teams,
                getTeams,
            }}
            {...props}
        />
    )
}

const useBaseball = () => useContext(BaseballContext);

export {useBaseball, BaseballProvider};