import {api} from '../index'

let gameEndpoint = {
    getTitleData: (data) => {
        api.dispatch("appRequest", data);
    }
}

export default gameEndpoint;