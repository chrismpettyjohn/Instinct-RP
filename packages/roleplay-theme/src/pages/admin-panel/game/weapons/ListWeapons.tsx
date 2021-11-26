import React from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllWeapons} from '../../../../hooks/weapon';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';

setURL('rp-admin/game/weapons', <ListWeapons />);

export function ListWeapons() {
  const weapons = useFetchAllWeapons();

  return (
    <GameLayout>
      <RPPermissionGuard permission="websiteManageWeapons" redirect={false}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Min. Damage</th>
              <th scope="col">Max. Damage</th>
              <th scope="col">Range</th>
              <th scope="col">Energy</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {weapons === undefined && <Icon type="spinner fa-spin" />}
          {weapons && (
            <tbody>
              {weapons.map(_ => (
                <tr key={`weapon_${_.id}`}>
                  <th scope="row">{_.id}</th>
                  <td>{_.name}</td>
                  <td
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      minWidth: 100,
                      maxWidth: 0,
                    }}
                  >
                    -<Icon className="text-success" type="dollar-sign" />
                    {_.cost.toLocaleString()}
                  </td>
                  <td>
                    -{_.minDamage} <Icon className="text-danger" type="heart" />
                  </td>
                  <td>
                    -{_.maxDamage} <Icon className="text-danger" type="heart" />
                  </td>
                  <td>{_.range} tiles</td>
                  <td>
                    -{_.energyUsed}
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
              ))}
            </tbody>
          )}
        </table>
        <div className="text-right">
          <button className="btn btn-outline-success mr-2">
            <Icon type="plus" />
            Add Weapon
          </button>
        </div>
      </RPPermissionGuard>
    </GameLayout>
  );
}
