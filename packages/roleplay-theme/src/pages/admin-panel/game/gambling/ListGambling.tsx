import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';

setURL('rp-admin/game/gambling', <ListGambling />);

export function ListGambling() {
  return (
    <GameLayout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Min. Bet</th>
            <th scope="col">Max. Bet</th>
            <th scope="col">Multiplier</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Slots</td>
            <td>slots</td>
            <td>
              <Icon className="text-success" type="dollar-sign" />5
            </td>
            <td>
              <Icon className="text-success" type="dollar-sign" />
              100
            </td>
            <td>0</td>
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
          Add Machine
        </button>
      </div>
    </GameLayout>
  );
}
