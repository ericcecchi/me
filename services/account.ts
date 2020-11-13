import copy from 'copy-to-clipboard';
import { map as loMap, omit as loOmit } from 'lodash-es';
import sjcl from 'sjcl';
import { Horizon, Keypair, Server, ServerApi } from 'stellar-sdk';
import { get, remove, set } from './storage';

export const server = new Server('https://horizon-testnet.stellar.org');

export interface StellarAccount {
  publicKey: string;
  keystore: string;
  state?: Partial<ServerApi.AccountRecord>;
  balances?: Partial<Horizon.BalanceLine>[];
}

export async function deleteAccount(confirmationCode: string) {
  if (confirmationCode === 'NUKE') {
    await remove('keyStore');
  } else {
    throw 'Confirmation is required';
  }
}

export async function getAccount(): Promise<StellarAccount> {
  let keystore = await get('keyStore');

  if (keystore) {
    keystore = atob(keystore);

    const { publicKey } = JSON.parse(atob(JSON.parse(keystore).adata));

    const { state, balances } = await server
      .accounts()
      .accountId(publicKey)
      .call()
      .then((account) => {
        const balances = loMap(account.balances, (balance) =>
          loOmit(balance, [
            'limit',
            'buying_liabilities',
            'selling_liabilities',
            'is_authorized',
            'last_modified_ledger',
          ])
        );

        const state = loOmit(account, [
          'id',
          '_links',
          'sequence',
          'subentry_count',
          'last_modified_ledger',
          'flags',
          'thresholds',
          'account_id',
          'signers',
          'paging_token',
          'data_attr',
          'balances',
        ]);

        return { state, balances };
      });

    return {
      publicKey,
      keystore,
      state,
      balances,
    };
  }

  return {
    publicKey: '',
    keystore: '',
  };
}

export async function createAccount({
  passcode1,
  passcode2,
}: {
  passcode1: string;
  passcode2: string;
}): Promise<StellarAccount> {
  if (!passcode1 || !passcode2 || passcode1 !== passcode2)
    throw 'Passcodes do not match.';

  const keypair = Keypair.random();
  const account = {
    publicKey: keypair.publicKey(),
    // @ts-ignore
    keystore: sjcl.encrypt(passcode1, keypair.secret(), {
      adata: JSON.stringify({
        publicKey: keypair.publicKey(),
      }),
    }),
  };

  await fetch(`https://friendbot.stellar.org?addr=${keypair.publicKey()}`);
  await set('keyStore', btoa(account.keystore));
  return account;
}

export function copySecret(passcode: string, account: StellarAccount) {
  if (!passcode) return;
  copy(sjcl.decrypt(passcode, account.keystore));
}
