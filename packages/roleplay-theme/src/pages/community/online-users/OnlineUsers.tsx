import './OnlineUsers.scss';
import {User} from '@instinct-prj/interface';
import React, {useEffect, useState} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {setURL, userService, Icon} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {UserContainer} from '../../../components/templates/user-container/UserContainer';

setURL('community/online', <OnlineUsers />);

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>();
  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const users = await userService.getOnline();
      setOnlineUsers(users);
    }

    fetchUsers();
  }, []);

  return (
    <UserLayout section="online">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>
                <Icon type="users" />
                Online Users
              </h1>
              {onlineUsers?.length === 0 && (
                <div>
                  <h4 className="text-white text-uppercase">
                    <Icon type="bed" />
                    It looks like everybody is sleeping
                  </h4>
                </div>
              )}
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {onlineUsers?.map(_ => (
            <div className="col-6" key={`user_${_.id}`}>
              <UserContainer user={_ as any} />
            </div>
          ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
