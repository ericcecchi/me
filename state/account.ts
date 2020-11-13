import {
  createContext,
  useContext,
  FunctionComponent,
  SyntheticEvent,
  Dispatch,
} from 'react';
import { StellarAccount } from '../services/account';

interface AccountModalState {
  content: FunctionComponent<any> | null;
}

interface AccountContext extends AccountModalState {
  account?: StellarAccount;
  error?: unknown;
  onClose: (e?: SyntheticEvent) => void;
  onOpen: (e?: SyntheticEvent) => void;
  viewAccount: (e: any) => void;
  isOpen: boolean;
  content: FunctionComponent | null;
  dispatch: Dispatch<AccountModalAction> | Function;
}

export interface SetStateAction {
  type: 'SET_STATE';
  data: Partial<AccountModalState>;
}

export interface SetContentAction {
  type: 'SET_MODAL_CONTENT';
  data: Pick<AccountModalState, 'content'>;
}

export type AccountModalAction = SetStateAction | SetContentAction;
export const initialState: AccountModalState = {
  content: null,
};
export const AccountContext = createContext<AccountContext>({
  ...initialState,
  account: {
    publicKey: '',
    keystore: '',
  },
  error: '',
  onClose: () => {},
  onOpen: () => {},
  viewAccount: () => {},
  isOpen: false,
  dispatch: () => {},
  content: () => null,
});

export function reducer(
  state: AccountModalState,
  action: AccountModalAction
): AccountModalState {
  switch (action.type) {
    case 'SET_MODAL_CONTENT':
      return {
        ...state,
        content: action.data.content,
      };
    case 'SET_STATE':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

export function useAccount() {
  return useContext(AccountContext);
}

export function setModalContent(
  content: FunctionComponent<any>
): SetContentAction {
  return {
    type: 'SET_MODAL_CONTENT',
    data: { content },
  };
}

export function setModalState(
  data: Partial<AccountModalState>
): SetStateAction {
  return {
    type: 'SET_STATE',
    data,
  };
}
