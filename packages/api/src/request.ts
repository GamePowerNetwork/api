import MessageTypes from "./models/enums/message-types";
import IMessage from "./models/interfaces/message";

// endpoints
import userEndpoint from "./endpoints/user"

let request = {

    getEndpointByType: (message: IMessage) => {
        try{
            //
            userEndpoint.getUser(message.Data);
        } catch(err){

        }
    },
}

export {
    request
}