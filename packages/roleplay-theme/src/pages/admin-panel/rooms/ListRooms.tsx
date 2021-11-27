import {Col, Input} from 'reactstrap';
import React, {useState} from 'react';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {roomPermissionToLabel} from './rooms.const';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';
import {useFetchAllRPRooms, useFilter} from '@instinct-plugin/roleplay-web';
import {EditRoomModal} from './edit-room-modal/EditRoomModal';

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
    return (
      Object.keys(roomPermissionToLabel)
        // @ts-ignore
        .filter(_ => room[_])
        .map(_ => (
          <div
            className="badge badge-pill badge-dark"
            key={`room_${room.id}_${_}`}
          >
            {roomPermissionToLabel[_]}
          </div>
        ))
    );
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
                  placeholder="Search rooms..."
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
                      <td style={{overflow: 'hidden', maxWidth: 400}}>
                        {getBadges(_)}
                      </td>
                      <td>
                        <EditRoomModal rpRoom={_} onChange={onChange} />
                      </td>
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
