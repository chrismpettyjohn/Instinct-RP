import React, {useContext} from 'react';
import {GuestLayoutProps} from './';
import {Card} from '../../generic/card/Card';
import {Footer} from '../../templates/footer';
import {configContext, GuestGuard} from '@instinct-web/core';

export function GuestLayout({children, style}: GuestLayoutProps) {
  const {config} = useContext(configContext);
  return (
    <GuestGuard>
      <span className="page-container">
        <main>
          <section className="page-content" style={style}>
            <div className="login-page">
              <div className="row">
                <div className="col-12">
                  <div className="text-center">
                    <img className="header-logo" src={config.logoURL} />
                  </div>
                  <Card style={{minWidth: 500}}>
                    {children}
                    <br />
                    <br />
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
      </span>
      <Footer />
    </GuestGuard>
  );
}
