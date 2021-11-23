import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthInfo } from '../../types/auth-info';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo | null => state[NameSpace.user].authInfo;
export const getFavorites = (state: State): number[] => state[NameSpace.user].favorites;
export const getLoadedDataStatus  = (state: State): boolean => state[NameSpace.user].isDataLoaded;
