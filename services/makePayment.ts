import { has as loHas } from 'lodash-es';
import sjcl from 'sjcl';
import {
  Account,
  Asset,
  BASE_FEE,
  Keypair,
  Networks,
  Operation,
  TransactionBuilder,
} from 'stellar-sdk';
import { StellarAccount, server } from './account';

interface MakePaymentProps {
  destination: string;
  amount: string;
  passcode: string;
  account: StellarAccount;
}

export const makePayment = async ({
  destination,
  amount,
  passcode,
  account,
}: MakePaymentProps) => {
  const keypair = Keypair.fromSecret(sjcl.decrypt(passcode, account.keystore));

  const { sequence } = await server
    .accounts()
    .accountId(keypair.publicKey())
    .call();
  const fullAccount = new Account(keypair.publicKey(), sequence);
  const transaction = new TransactionBuilder(fullAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(0)
    .build();

  transaction.sign(keypair);
  try {
    await server.submitTransaction(transaction);
  } catch (err) {
    if (
      // Paying an account which doesn't exist, create it instead
      loHas(err, 'response.data.extras.result_codes.operations') &&
      err.response.data.status === 400 &&
      err.response.data.extras.result_codes.operations.indexOf(
        'op_no_destination'
      ) !== -1
    ) {
      const transaction = new TransactionBuilder(fullAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.createAccount({
            destination,
            startingBalance: amount,
          })
        )
        .setTimeout(0)
        .build();

      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    } else throw err;
  }
};
