import MessageTypes from "../enums/message-types";

interface IMessage {
    Type: MessageTypes;
    Data: any;
}

export default IMessage