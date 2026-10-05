import CryptoJS from "crypto-js";

export class CryptoJSHelper {
  public static async encrypt(content: string) {
    return await CryptoJS.AES.encrypt(
      content,
      process.env.HANDSHAKE!,
    ).toString();
  }

  public static async decrypt(content: string) {
    return await CryptoJS.AES.decrypt(content, process.env.HANDSHAKE!).toString(
      CryptoJS.enc.Utf8,
    );
  }
}
