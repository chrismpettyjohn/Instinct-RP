import React, {useState} from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllVendingMachines} from '../../../../hooks/vending-machine';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {DeleteVendingMachineModal} from './delete-vending-machine-modal/DeleteVendingMachineModal';
import {EditVendingMachineModal} from './edit-vending-machine-modal/EditVendingMachineModal';
import {useFilter} from '../../../../hooks/filter/use-filter';
import {Input} from 'reactstrap';

setURL('rp-admin/game/vending-machines', <ListVendingMachines />);

export function ListVendingMachines() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const vendingMachines = useFetchAllVendingMachines(refresh);

  const filteredVendingMachines =
    vendingMachines?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  return (
    <GameLayout>
      <RPPermissionGuard
        permission="websiteManageVendingMachines"
        redirect={false}
      >
        <div className="p-2 mb-3">
          <Input
            value={filter}
            onChange={setFilter}
            placeholder="Search vending machines..."
          />
        </div>
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
              {filteredVendingMachines.map(_ => (
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
                    <EditVendingMachineModal
                      vendingMachine={_}
                      onChange={onChange}
                    />
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
