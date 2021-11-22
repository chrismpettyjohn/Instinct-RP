import {UserService} from './User.types';
import {UserServiceImplementation} from './User';

export const userService: UserService = new UserServiceImplementation();
