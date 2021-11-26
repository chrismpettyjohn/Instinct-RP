import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllGamblingMachines} from '../../../../hooks/gambling-machine/fetch-all';

setURL('rp-admin/game/gambling', <ListGambling />);

export function ListGambling() {
  const gamblingMachines = useFetchAllGamblingMachines();

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
        {gamblingMachines === undefined && <Icon type="spinner fa-spin" />}
        {gamblingMachines && (
          <tbody>
            {gamblingMachines.map(_ => (
              <tr key={`gambling_machine_${_.id}`}>
                <th scope="row">{_.id}</th>
                <td>{_.name}</td>
                <td>{_.tyoe}</td>
                <td>
                  <Icon className="text-success" type="dollar-sign" />
                  {_.minimumBet}
                </td>
                <td>
                  <Icon className="text-success" type="dollar-sign" />
                  {_.maximumBet}
                </td>
                <td>{_.multiplier}</td>
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
          Add Machine
        </button>
      </div>
    </GameLayout>
  );
}
