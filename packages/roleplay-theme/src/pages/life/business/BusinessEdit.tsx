import React from 'react';
import {toast} from 'react-toastify';
import {Link, useRoute} from 'wouter';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {BusinessEditor} from './editor/BusinessEditor';
import {UserLayout} from '../../../components/layout/user';
import {
  businessService,
  useFetchBusinessByID,
} from '@instinct-plugin/roleplay-web';
import {BusinessDTO} from '@instinct-plugin/roleplay-types';
import {Container} from '../../../components/generic/container/Container';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('businesses/edit/:businessID', <BusinessEdit />);

export function BusinessEdit() {
  const [matched, params] = useRoute<{businessID: string}>(
    '/businesses/edit/:businessID'
  );

  const business = useFetchBusinessByID(params!.businessID);

  if (!business) {
    return (
      <UserLayout section="business">
        <RPPermissionGuard permission="websiteCreateBusiness">
          <Container>
            <Row>
              <div className="col-12">
                <Icon type="spinner fa-spin fa-3x" />
                <h2>Loading Business</h2>
              </div>
            </Row>
          </Container>
        </RPPermissionGuard>
      </UserLayout>
    );
  }

  const businessDTO: BusinessDTO = {
    name: business.name,
    desc: business.desc,
    type: business.type,
    badge: business.badge,
    homeRoom: business.homeRoomID,
    investment: 0,
    positions: business.positions.map(businessPosition => ({
      id: businessPosition.id,
      order: businessPosition.order,
      name: businessPosition.name,
      maleUniform: businessPosition.maleUniform,
      femaleUniform: businessPosition.femaleUniform,
      shiftWage: businessPosition.shiftWage,
    })),
  };

  async function onSubmit(newBusinessDTO: BusinessDTO) {
    try {
      await businessService.delete(business!.id.toString());
      toast.success(
        `Your changes to ${newBusinessDTO.name} were saved successfully`
      );
    } catch {
      toast.error(
        `There was a problem when saving your changes to ${business!.name}`
      );
    }
  }

  return (
    <UserLayout section="business">
      <RPPermissionGuard permission="websiteCreateBusiness">
        <Container>
          <Row>
            <div className="col-12">
              <Link to="/businesses">
                <Icon
                  className="fa-4x text-white"
                  style={{cursor: 'pointer'}}
                  type="caret-left"
                />
              </Link>
            </div>
          </Row>
          <Row>
            <MiniJumbotron>
              <h2>Business Editor</h2>
              <p>
                You are making changes to <b>{business.name}</b>
              </p>
            </MiniJumbotron>
          </Row>
          <Row>
            <div style={{width: '100%'}}>
              <BusinessEditor
                defaultBusiness={businessDTO}
                onSubmit={onSubmit}
                editorOnly
              />
            </div>
          </Row>
        </Container>
      </RPPermissionGuard>
    </UserLayout>
  );
}
