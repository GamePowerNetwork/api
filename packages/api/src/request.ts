import MessageTypes from "./models/enums/message-types"
import IMessage from "./models/interfaces/message"

// endpoints
import userEndpoint from "./endpoints/user"
import appEndpoint from "./endpoints/app"
import gameEndpoint from "./endpoints/game"

let request = {

    getEndpoint: (message: IMessage) => {
        try{
            const [ path, method ] = message.Data["Endpoint"].split("/");
            switch(path){
                case "user":
                    userEndpoint[method](message.Data);
                    break;
                case "app":
                    appEndpoint[method](message.Data);
                    break;
            }
        } catch(err){

        }
    },
}

export {
    request
}