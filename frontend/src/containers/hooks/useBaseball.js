import { useState, createContext, useContext, useEffect } from "react";
import { FileTextOutlined, TrophyOutlined ,UserOutlined } from '@ant-design/icons';

const client = new WebSocket('ws://172.20.10.3:4000/')

client.onopen = () => {
    sendData(["get_teams"])
}

const sendData = async (data) => {
    await client.send(JSON.stringify(data));
}

const BaseballContext = createContext(
    {
      items: [],
      setItems: () => {},

      teams: [],
      setTeams: () => {},

      players: [],
      setPlayers: () => {},

      captain: {},
      setCaptain: () => {},

      managers: [],
      setManagers: () => {},

      games: [],
      setGames: () => {},

      scores: {},
      setScores: () => {},

      historyGames: [],
      setHistoryGames: () => {},

      hitRecords: [],
      setHitRecords: () => {},

      getTeams: () => {},

      getPeople: () => {},

      get_schedule: () => {},

      get_score: () => {},
    }
)

const BaseballProvider = (props) => {
  
    const [items, setItems] = useState([
        {
          label: '球隊',
          key: 'team',
          icon: <UserOutlined />,
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
          icon: <FileTextOutlined />,
        },
        {
          label: "戰績",
          key: 'score',
          icon: <TrophyOutlined />,
        },
      ])
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [captain, setCaptain] = useState({});
    const [managers, setManagers] = useState([]);
    const [games, setGames] = useState([]);
    const [scores, setScores] = useState({});
    const [historyGames, setHistoryGames] = useState([]);
    const [hitRecords, setHitRecords] = useState([]);



    // sending request
    const getTeams = () => {
        sendData(["get_teams"]);
        console.log("send request")
    }

    const getPeople = (teamName, type) => {
        switch (type){
            case "players": {
                sendData(["get_team_players", teamName])
                break;
            }

            case "captain": {
                sendData(["get_team_captain", teamName])
                break;
            }

            case "managers": {
                sendData(["get_team_managers", teamName])
                break;
            }
        }
    }

    const get_schedule = (year, month) => {
        sendData(["get_games", [year, month]])
    }

    const get_score = (teamName) => {
        sendData(["get_score", teamName])
    }

    const get_hitRecords = (gameID) => {
        sendData(["get_hit_records", gameID])
    }


    // receiving data
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

            case "rp_get_games": {
                setGames(payload);
                break;
            }

            case "rp_get_score": {
                const [scores, historyGames] = payload;
                setScores(scores);
                setHistoryGames(historyGames);
                break;
            }

            case "rp_get_hit_records": {
                console.log(payload)
                setHitRecords(payload);
                break;
            }
        }
    }

    return (
        <BaseballContext.Provider
            value={{
                items,
                teams,
                players,
                captain,
                managers,
                scores,
                historyGames,
                games,
                hitRecords,
                getTeams,
                getPeople,
                get_schedule,
                get_score,
                get_hitRecords,
            }}
            {...props}
        />
    )
}

const useBaseball = () => useContext(BaseballContext);

export {useBaseball, BaseballProvider};