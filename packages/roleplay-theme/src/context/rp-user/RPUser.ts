import {createContext} from 'react';
import {defaultRPUserContext, RPUserContext} from './RPUser.types';

export const rpUserContext = createContext<RPUserContext>(defaultRPUserContext);
