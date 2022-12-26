import React from 'react';
import { Badge, Calendar } from 'antd';

import { useBaseball } from '../containers/hooks/useBaseball';

const getListData = (value, games) => {
    let listData = [];
    const date = Number(value.date())
    const month = Number(value.month()) + 1
    for ( let i = 0 ; i < games.length ; i++){
      if (date == games[i].day && month == games[i].month){
        listData.push(
          {
            type: 'success',
            content: `${games[i].HomeTeam} vs. ${games[i].AwayTeam}`
          }
        )
      }
    }
    return listData;
}


const getMonthData = (value) => {
};
const Schedule = () => {
  const { games, get_schedule } = useBaseball();

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value, games) => {
    const listData = getListData(value,games);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar 
    dateCellRender={(value)=>{
      return dateCellRender(value, games)}} 
    monthCellRender={(value)=>{
      return monthCellRender(value, games)}}
    onPanelChange={(value)=>{
      get_schedule(Number(value.year()), Number(value.month()) + 1)
    }}
      />;
    };
export default Schedule;