import {api} from '../index'

let appEndpoint = {
    requestPermission: (data) => {
        api.dispatch("appRequest", data);
    },

    grantCollectable: (data) => {
        api.dispatch("grantCollectable", data);
    }
}

export default appEndpoint;