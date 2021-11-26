import React, {useState} from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllVendingMachines} from '../../../../hooks/vending-machine';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {DeleteVendingMachineModal} from './delete-vending-machine-modal/DeleteVendingMachineModal';

setURL('rp-admin/game/vending-machines', <ListVendingMachines />);

export function ListVendingMachines() {
  const [refresh, setRefresh] = useState(0);

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  const vendingMachines = useFetchAllVendingMachines(refresh);

  return (
    <GameLayout>
      <RPPermissionGuard
        permission="websiteManageVendingMachines"
        redirect={false}
      >
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
          {vendingMachines === undefined && <Icon type="spinner fa-spin" />}
          {vendingMachines && (
            <tbody>
              {vendingMachines.map(_ => (
                <tr key={`vending_machine_${_.id}`}>
                  <th scope="row">{_.id}</th>
                  <td>{_.name}</td>
                  <td>
                    -<Icon className="text-success" type="dollar-sign" />
                    {_.cost}
                  </td>
                  <td>
                    +{_.hungerRestored} <Icon type="drumstick" />
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
                    <button className="btn btn-outline-primary mr-2">
                      <Icon type="pencil" />
                      Edit
                    </button>
                    <DeleteVendingMachineModal
                      vendingMachine={_}
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
            Add Vending Machine
          </button>
        </div>
      </RPPermissionGuard>
    </GameLayout>
  );
}
