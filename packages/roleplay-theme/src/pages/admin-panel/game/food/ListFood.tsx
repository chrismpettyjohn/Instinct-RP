import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';

setURL('rp-admin/game/food', <ListFood />);

export function ListFood() {
  return (
    <GameLayout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Cost</th>
            <th scope="col">Health</th>
            <th scope="col">Energy</th>
            <th scope="col">Hunger</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>bleach</td>
            <td>drink</td>
            <td>$5</td>
            <td>
              +5 <Icon className="text-danger" type="heart" />
            </td>
            <td>
              +5
              <span style={{color: 'yellow'}}>
                <Icon type="bolt" />
              </span>
            </td>
            <td>
              +2 <Icon type="drumstick" />
            </td>
            <td>
              <button className="btn btn-outline-primary mr-2">
                <Icon type="pencil" />
                Edit
              </button>
              <button className="btn btn-outline-danger">
                <Icon type="trash" />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-right">
        <button className="btn btn-outline-success mr-2">
          <Icon type="plus" />
          Add Food
        </button>
      </div>
    </GameLayout>
  );
}
