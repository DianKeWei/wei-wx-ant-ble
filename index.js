
import { BTManager } from './src/btmanager.js';
import { ConnectStatus, SuccessCallbackEvent, ErrorCallbackEvent, SuccessApiThen, ErrorApiCatch } from './src/enum.js';
import { isEmpty, isNullOrUndefined, ab2str, str2ab, typedArray2ArrayBuffer, createXOR, uuid128to16 } from './src/tools.js'
const Version = '1.0.2';

export {
    Version,

    BTManager,

    ConnectStatus,
    SuccessCallbackEvent,
    ErrorCallbackEvent,
    SuccessApiThen,
    ErrorApiCatch,

    isEmpty,
    isNullOrUndefined,
    ab2str,
    str2ab,
    typedArray2ArrayBuffer,
    createXOR,
    uuid128to16
}