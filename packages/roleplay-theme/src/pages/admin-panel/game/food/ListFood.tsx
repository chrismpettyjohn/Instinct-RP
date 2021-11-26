import React, {useState} from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllFood, useFilter} from '@instinct-plugin/roleplay-web';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {DeleteFoodModal} from './delete-food-modal/DeleteFoodModal';
import {EditFoodModal} from './edit-food-modal/EditFoodModal';
import {Input} from 'reactstrap';

setURL('rp-admin/game/food', <ListFood />);

export function ListFood() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const foodOptions = useFetchAllFood(refresh);

  const filteredFood =
    foodOptions?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  return (
    <GameLayout>
      <RPPermissionGuard permission="websiteManageFood" redirect={false}>
        <div className="p-2 mb-3">
          <Input
            value={filter}
            onChange={setFilter}
            placeholder="Search food..."
          />
        </div>
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
              {filteredFood.map(_ => (
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
                    <EditFoodModal food={_} onChange={onChange} />
                    <DeleteFoodModal food={_} onDelete={onChange} />
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
      </RPPermissionGuard>
    </GameLayout>
  );
}
