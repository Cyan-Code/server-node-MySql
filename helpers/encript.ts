import CryptoJS, {AES} from "crypto-js"

export const encript = (pd:string, key='string'):string => {
  const pdCipher = AES.encrypt(pd, key);
  const password = pdCipher.toString()
  return password
}

export const deCrypt = (pdCrypt:string, key='string'):string => {
  const pdDecrypt = CryptoJS.AES.decrypt(pdCrypt, key).toString(CryptoJS.enc.Utf8);
  return pdDecrypt
}

