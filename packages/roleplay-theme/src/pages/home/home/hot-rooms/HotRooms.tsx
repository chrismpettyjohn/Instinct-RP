import React from 'react';
import {Icon} from '@instinct-web/core';
import {Card} from '../../../../components/generic/card/Card';

export function HotRoomsCard() {
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
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Canal St</td>
            <td>
              <Icon type="users" />3
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
