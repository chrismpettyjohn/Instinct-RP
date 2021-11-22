import {Link, useLocation} from 'wouter';
import {Header} from '../../templates/header';
import {NavBar} from '../../templates/navbar';
import {Footer} from '../../templates/footer';
import {UserLayoutProps} from './UserLayout.types';
import React, {useContext, useEffect} from 'react';
import {
  Icon,
  UserGuard,
  healthContext,
  sessionContext,
} from '@instinct-web/core';

export function UserLayout({
  children,
  section = 'home',
  style,
}: UserLayoutProps) {
  const [location, setLocation] = useLocation();
  const {user} = useContext(sessionContext);
  const {health} = useContext(healthContext);

  useEffect(() => {
    if (user === undefined) {
      setLocation('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <UserGuard>
      <span className="page-container">
        <Header>
          <div
            className="rounded-button"
            style={{
              background: '#001726',
              border: 'none',
              boxShadow: '2px 2px #0F416C',
              color: 'white',
            }}
          >
            {health.usersOnline}
            <Icon className="ml-2" type="user" />
          </div>
          <Link to="/play">
            <div
              className="rounded-button"
              style={{
                background: '#001726',
                border: 'none',
                boxShadow: '2px 2px #0F416C',
                color: 'white',
                marginLeft: '2.5%',
              }}
            >
              Play
              <Icon className="ml-2" type="sign-in-alt" />
            </div>
          </Link>
        </Header>
        <NavBar />
        <main>
          <section className="page-container" data-page={section} style={style}>
            {children}
          </section>
        </main>
      </span>
      <Footer />
    </UserGuard>
  );
}
