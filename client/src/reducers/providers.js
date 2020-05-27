import {PROVIDER_CREATED,PROVIDER_CREATION_FAILED} from '../actions/types';

const initialState = {
    prividerCreated:null,
}

export default function(state=initialState,action){
    const {type} = action;
    switch(type){
        case PROVIDER_CREATED:
            return {
                ...state,
                prividerCreated:true,
            }
        case PROVIDER_CREATION_FAILED:
            return {
                ...state,
                PROVIDER_CREATION_FAILED:false,
            }
        default:
            return state;
    }
}