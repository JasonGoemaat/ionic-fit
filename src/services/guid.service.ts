import { Injectable } from '@angular/core';

@Injectable()
export class GuidService {
    constructor() {
    }

    /**
     * https://www.ietf.org/rfc/rfc4122.txt
     */
    createRandomGuid(): string {
        // we need about 16 bytes or randomness, but 32 hex digits, we will use
        // 4 nibbles of each for each digit
        let hexDigits = '0123456789abcdef';

        let arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        // now we modify the 13th nibble to be '4' for version specifying random
        arr[6] = arr[6] & 0x0f | 0x40;
        // now we modify the 17th nibble to start with msb '10' so it will be 8, 9, a, or b
        arr[8] = arr[8] & 0x3f | 0x80;

        // now we can compose it into an array of hex bytes
        let byteStrings = Array.from(arr).map(value => hexDigits[value >> 4] + hexDigits[value & 0x0f]);

        // and compose with dashes
        let result = byteStrings[0] + byteStrings[1] + byteStrings[2] + byteStrings[3] + '-' +
            byteStrings[4] + byteStrings[5] + '-' +
            byteStrings[6] + byteStrings[7] + '-' +
            byteStrings[8] + byteStrings[9] + '-' +
            byteStrings[10] + byteStrings[11] + byteStrings[12] + byteStrings[13] + byteStrings[14] + byteStrings[15];

        return result;

        // let parts = [
        //     (arr[0] << 24) | (arr[1] << 16) | (arr[2] << 8) | arr[3],
        //     (arr[4] << 8) | arr[5],
        //     ((arr[6] & 0xf | 0x40) << 8) | arr[7], // includes '4' version as high nibble
        //     ((arr[8] & 0x3f | 0x80) << 8) | arr[9], // includes msb '10', so high nibble 8, 9, a, b
        //     (arr[10] << 24) | (arr[11] << 16) | (arr[12] << 8)
        
    }
}


/*
Samples:
              A    B
6033a2b7-f454-42bb-975b-dc9ad8280b04
194adc67-8b7e-4194-8e0c-02e77e9a38c1
73bfd262-ef29-4f0c-af7f-7df30324d18f
b38d45fb-c387-4eee-ad87-ceecf5d729c9
ea07ed72-d71f-466a-b9af-06d6ce340029
c20c1c6e-6141-427e-ad1f-7533b5a6ddf8
5842d132-a0bf-4ac0-b2cf-4c6a98a0a393
26757fe2-5c70-4a6d-8e88-e695f364e76d
2495cf7e-e7de-4c5b-81e3-3bbc4927073a
9daabc04-9756-42df-8c34-b03edc1e6594

Notes:
    A is the version number, always '4' for this type
    B must have the high two bits '10', so will be 8, 9, a, or b
    All other bits are random
*/