import React, {useState} from 'react';
import {GameLayout} from '../Game';
import {setURL, Icon} from '@instinct-web/core';
import {useFetchAllWeapons, useFilter} from '@instinct-plugin/roleplay-web';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {DeleteWeaponModal} from './delete-weapon-modal/DeleteWeaponModal';
import {EditWeaponModal} from './edit-weapon-modal/EditWeaponModal';
import {Input} from 'reactstrap';

setURL('rp-admin/game/weapons', <ListWeapons />);

export function ListWeapons() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const weapons = useFetchAllWeapons(refresh);

  const filteredWeapons =
    weapons?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  return (
    <GameLayout>
      <RPPermissionGuard permission="websiteManageWeapons" redirect={false}>
        <div className="p-2 mb-3">
          <Input
            value={filter}
            onChange={setFilter}
            placeholder="Search weapons..."
          />
        </div>
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
              {filteredWeapons.map(_ => (
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
                    <EditWeaponModal weapon={_} onChange={onChange} />
                    <DeleteWeaponModal weapon={_} onDelete={onChange} />
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
