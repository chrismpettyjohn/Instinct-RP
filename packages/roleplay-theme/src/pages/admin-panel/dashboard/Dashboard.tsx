import React from 'react';
import {Col} from 'reactstrap';
import {setURL} from '@instinct-web/core';
import {Card} from '../components/card/Card';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin', <Dashboard />);

export function Dashboard() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="RP Admin Panel">
        <p>Welcome to the RP admin panel</p>
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={6}>
            <Card header="Inspirational Video">
              <iframe
                width="100%"
                height={315}
                src="https://www.youtube-nocookie.com/embed/Hy8kmNEo1i8?controls=0&amp;"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Card>
          </Col>
          <Col xs={6}>
            <Card>
              <img src="https://news.cgtn.com/news/2020-07-14/Sauron-5G-and-the-Five-Black-Eyes-S7i9xRgjgA/img/6e8874393dd546f5a50c8f4f3aa727d9/6e8874393dd546f5a50c8f4f3aa727d9.png" width="100%" height={300} />
              <p>We are always watching</p>
              <p style={{marginTop: -20}}>
                <small style={{fontSize: '.75rem'}}>
                  <span style={{textDecoration: 'line-through'}}>even</span> <b>especially</b> when you are sleeping
                </small>
              </p>
            </Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
