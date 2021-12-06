import React from 'react';
import {take} from 'lodash';
import {Icon, useFetchPopularRooms} from '@instinct-web/core';
import {Card} from '../../../../components/generic/card/Card';

export function HotRoomsCard() {
  const hotRooms = useFetchPopularRooms();

  const topFiveRooms = hotRooms ? take(hotRooms, 5) : [];

  return (
    <Card header="Hot Rooms">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Room</th>
            <th scope="col">Users</th>
          </tr>
        </thead>
        {hotRooms ? (
          <tbody>
            {topFiveRooms.map(room => (
              <tr key={`hot_room_${room.id}`}>
                <th scope="row">{room.id}</th>
                <td>{room.name}</td>
                <td>
                  <Icon type="users" /> {room.currentUsers}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <>
            <Icon type="spinner fa-spin" /> Loading...
          </>
        )}
      </table>
    </Card>
  );
}
