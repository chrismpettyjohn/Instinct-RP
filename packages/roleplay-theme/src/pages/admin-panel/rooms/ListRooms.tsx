import {Col, Input} from 'reactstrap';
import React, {useState} from 'react';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';
import {useFetchAllRPRooms, useFilter} from '@instinct-plugin/roleplay-web';

setURL('rp-admin/rooms', <ListRooms />);

export function ListRooms() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const rpRooms = useFetchAllRPRooms(refresh);

  const filteredRooms =
    rpRooms?.filter(_ => _.roomName?.toLowerCase()?.includes(filter)) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  function getBadges(room: RPRoom) {
    const permissionToBadge: Record<string, string> = {
      bankEnabled: 'Bank',
      casinoEnabled: 'Casino',
      meleeEnabled: 'Can Melee',
      shootEnabled: 'Can Shoot',
      bombEnabled: 'Can Bomb',
      hitEnabled: 'Can Hit',
      magicEnabled: 'Can Use Magic',
      robEnabled: 'Can Rob',
      daylightEnabled: 'Daylight System',
      turfEnabled: 'Gang Turf',
      hospitalEnabled: 'Hospital',
      safezoneEnabled: 'Safezone!',
      mwEnabled: 'MW',
      gymEnabled: 'Gym',
      taxiToEnabled: 'Can Taxi To',
      taxiFromEnabled: 'Can Taxi From',
    };

    // @ts-ignore
    return Object.keys(permissionToBadge)
      .filter(_ => room[_])
      .map(_ => (
        <div
          className="badge badge-pill badge-dark"
          key={`room_${room.id}_${_}`}
        >
          {permissionToBadge[_]}
        </div>
      ));
  }

  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="Manage Rooms">
        Here you can update various RP settings for rooms in-game
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={12}>
            <Card>
              <div className="p-2 mb-3">
                <Input
                  value={filter}
                  onChange={setFilter}
                  placeholder="Search crimes..."
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Abilities</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {rpRooms === undefined && <Icon type="spinner fa-spin" />}
                {filteredRooms.map(_ => (
                  <tbody>
                    <tr key={`room_${_.id}`}>
                      <th scope="row">{_.id}</th>
                      <td>{_.roomName}</td>
                      <td style={{overflow: 'hidden'}}>{getBadges(_)}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
