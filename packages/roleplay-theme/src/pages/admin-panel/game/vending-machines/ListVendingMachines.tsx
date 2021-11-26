import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';

setURL('rp-admin/game/vending-machines', <ListVendingMachines />);

export function ListVendingMachines() {
  return (
    <GameLayout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Cost</th>
            <th scope="col">Hunger</th>
            <th scope="col">Health</th>
            <th scope="col">Energy</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bag of Cheetos</td>
            <td>$3</td>
            <td>
              +5 <Icon type="drumstick" />
            </td>
            <td>
              +10 <Icon className="text-danger" type="heart" />
            </td>
            <td>
              +5
              <span style={{color: 'yellow'}}>
                <Icon type="bolt" />
              </span>
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
          Add Vending Machine
        </button>
      </div>
    </GameLayout>
  );
}
