import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllFood} from '../../../../hooks/food/fetch-all';

setURL('rp-admin/game/food', <ListFood />);

export function ListFood() {
  const foodOptions = useFetchAllFood();

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
        {foodOptions === undefined && <Icon type="spinner fa-spin" />}
        {foodOptions && (
          <tbody>
            {foodOptions.map(_ => (
              <tr key={`food_${_.id}`}>
                <th scope="row">{_.id}</th>
                <td>{_.name}</td>
                <td>{_.type}</td>
                <td>
                  -<Icon className="text-success" type="dollar-sign" />
                  {_.cost}
                </td>
                <td>
                  +{_.healthGained}{' '}
                  <Icon className="text-danger" type="heart" />
                </td>
                <td>
                  +{_.energyGained}
                  <span style={{color: 'yellow'}}>
                    <Icon type="bolt" />
                  </span>
                </td>
                <td>
                  +{_.hungerRestored} <Icon type="drumstick" />
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
            ))}
          </tbody>
        )}
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
