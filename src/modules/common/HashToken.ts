import {
    createHash,
    createCipheriv,
    createDecipheriv,
    randomBytes
  } from "crypto";
  import { compareAsc, isDate, addSeconds, addMinutes, addHours, addDays } from 'date-fns';
import { catchError } from "./utils";

const { TOKENKEY, ALGORITHM } = process.env;

if(typeof TOKENKEY !== "string" || typeof ALGORITHM !== "string") throw catchError('PROVIDE TOKENKEY AND ALGORITHM IN ENV', 400);

  class AuthenticationService {
    private param: any;

    constructor(param: unknown) {
      this.param = param;
    }

    public encrypt() {
      try {
        if (typeof this.param !== "object") {
          throw catchError("Please provide an object to encrypt", 400);

        }
        const initializationVector = randomBytes(16);
        const cipher = createCipheriv(ALGORITHM, Buffer.from(String(TOKENKEY)).subarray(0,16), initializationVector);
        let encryptedData = cipher.update(JSON.stringify(this.param));
        encryptedData = Buffer.concat([encryptedData, cipher.final()]);
        return `${encryptedData.toString("hex")}.${initializationVector.toString('hex')}`;
      } catch (error) {
        throw catchError('There is an error authenticating your requests', 500);
      }
    }

    public decrypt() {
      try {
        const splitToken = this.param.split(".");
        let decryptedString = Buffer.from(splitToken[0], "hex");
        const iv = Buffer.from(splitToken[1], "hex");

        let decipher = createDecipheriv(ALGORITHM, Buffer.from(String(TOKENKEY)).subarray(0,16), iv);
        let decryptedData = decipher.update(decryptedString);
        decryptedData = Buffer.concat([decryptedData, decipher.final()]);
        //return decrypted data in its form
        return JSON.parse(decryptedData.toString());
      } catch (error) {
        throw catchError(error, 500);
      }
    }
  }

  export default AuthenticationService;
