import { HmacSHA256, AES, enc, mode, pad } from 'crypto-js'
export class Utils {
    public static hmacSHA256(data: string, privateKey: string): string {
        let encrypted = HmacSHA256(data, privateKey);
        return enc.Base64.stringify(encrypted);
    }
    public static aesDecrypt(ciphertext: string, key: string, iv: string = null): string {
        let keys = enc.Utf8.parse(key);
        let ivs = iv ? enc.Utf8.parse(iv) : keys;
        let hexStr = enc.Hex.parse(ciphertext);
        let srcs = enc.Base64.stringify(hexStr);
        let decrypted = AES.decrypt(srcs, keys, {
            iv: ivs,
            mode: mode.CBC,
            padding: pad.Pkcs7,
        });
        return decrypted.toString(enc.Utf8).toString();
    }
}