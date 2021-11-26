import React, {useState} from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllGamblingMachines} from '../../../../hooks/gambling-machine/fetch-all';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {DeleteGamblingMachine} from './delete-gambling-machine-modal/DeleteGamblingMachine';
import {EditGamblingModal} from './edit-gambling-modal/EditGamblingModal';
import {useFilter} from '../../../../hooks/filter/use-filter';
import {Input} from 'reactstrap';

setURL('rp-admin/game/gambling', <ListGambling />);

export function ListGambling() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const gamblingMachines = useFetchAllGamblingMachines(refresh);

  const filteredGamblingMachines =
    gamblingMachines?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  return (
    <GameLayout>
      <RPPermissionGuard permission="websiteManageGambling" redirect={false}>
        <div className="p-2 mb-3">
          <Input
            value={filter}
            onChange={setFilter}
            placeholder="Search gambling machines..."
          />
        </div>
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
              {filteredGamblingMachines.map(_ => (
                <tr key={`gambling_machine_${_.id}`}>
                  <th scope="row">{_.id}</th>
                  <td>{_.name}</td>
                  <td>{_.type}</td>
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
                    <EditGamblingModal
                      gamblingMachine={_}
                      onChange={onChange}
                    />
                    <DeleteGamblingMachine
                      gamblingMachine={_}
                      onDelete={onChange}
                    />
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
      </RPPermissionGuard>
    </GameLayout>
  );
}
