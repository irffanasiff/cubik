import * as anchor from '@coral-xyz/anchor';
import { getCsrfToken } from 'next-auth/react';
import nacl from 'tweetnacl';

export const createMessage = async (crsfToken?: string | undefined) => {
  const message =
    'Welcome to Cubik a platform where community helps projects to grow'; //todo: isko change karna hai
  let crsf: string | undefined = '';
  if (crsfToken) {
    console.log('fun pass');

    crsf = crsfToken;
  } else {
    console.log('new called');
    crsf = await getCsrfToken();
  }

  const data = new TextEncoder().encode(message + '-' + crsf);

  return data;
};
export const verifyMessage = async (
  signature: string,
  publicKey: anchor.web3.PublicKey,
  crfToken?: string
) => {
  const message = await createMessage(crfToken);

  const result = nacl.sign.detached.verify(
    message,
    anchor.utils.bytes.bs58.decode(signature),
    publicKey.toBytes()
  );
  console.log(result, '-- result');

  return result;
};
