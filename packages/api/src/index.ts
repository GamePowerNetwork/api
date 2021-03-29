import { ApiPromise, WsProvider } from '@polkadot/api';

import MessageTypes from "./models/enums/message-types";
import IMessage from "./models/interfaces/message";
import {request} from "./request";

let connection;
let callbackMap = {
    appRequest: () => void 0,
    userData: () => void 0,
    grantCollectable: () => void 0,
}

let api = {

    on: (event:string, callback:Function) => {
        callbackMap[event] = callback;
    },

    dispatch: (event:string, data:any) => {
        callbackMap[event](data);
    },

    connect: async (uri) => {
        const wsProvider = new WsProvider(uri);
        connection = await ApiPromise.create({ 
        provider: wsProvider,
        
        types: {
            "CID": "Vec<u8>",
            "GuildId": "u64",
            "GuildOf": "Guild<AccountIdOf>",
            "AccountIdOf": "AccountId",
            "BalanceOf": "Balance",
            "ClassId": "u64",
            "ClassIdOf": "ClassId",
            "ClassInfoOf": "ClassInfo",
            "ClassInfo": {
            "metadata": "Vec<u8>",
            "total_issuance": "TokenId",
            "owner": "AccountId",
            "data": "ClassData"
            },
            "ClassData": {
            "deposit": "Balance",
            "properties": "ClassProperties"
            },
            "TokenId": "u64",
            "Amount": "i128",
            "AmountOf": "Amount",
            "CurrencyIdOf": "CurrencyId",
            "CurrencyId": {
            "_enum": [
                "Native",
                "DOT",
                "KSM",
                "AP"
            ]
            },
            "Guild": {
            "id": "GuildId",
            "name": "Text",
            "members": "Vec<AccountId>"
            },
            "GuildUpdate": {
            "members": "Vec<AccountId>",
            "name": "Text"
            },
            "ClassProperties": {
            "Transferrable": "bool",
            "Burnable": "bool"
            }
        }
        });
    },

    parseData: (rawData) => {
        try{
            let message:IMessage = JSON.parse(rawData) as IMessage;

            switch(message.Type){
                case MessageTypes.ApiRequest:
                case MessageTypes.AppRequest:
                    request.getEndpoint(message);
                    break;

                default:
                    break;
            }
        } catch(err){

        }
    },

    loginUser: (address) => {
        alert("User logged in with adress: " + address);
    },
}

export {
    api,
    MessageTypes,
    IMessage
}