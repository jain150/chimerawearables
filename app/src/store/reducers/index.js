import * as actionTypes from '../actions';

const initialState = {

    categories: ['Function', 'Body Zones', 'Material', 'Fabrication'],
    functions: ['store', 'breathability', 'feedback'],
    bodyZones: ['head', 'chest', 'pelvic region', 'arms', 'legs',
    'wrists & hand', 'back', 'full body', 'feet'],
    fabrication: ['weaving', 'layering', 'painting'],
    material: ['polymers', 'threads', 'adhesives'],
    selFunction: null,
    selBodyZones: null,
    selFabrication: null,
    selMaterial: null,

};

const reducer = ( state = initialState, action ) => {

    console.log(state);
    switch ( action.type ) {
        case actionTypes.SELECT_FUNCTION:
            return {
                ...state,
                selFunction: action.val
            }
        case actionTypes.SELECT_BODYZONES:
            return {
                ...state,
                selBodyZones: action.val
            }
        case actionTypes.SELECT_FABRICATION:
            return {
                ...state,
                selFabrication: action.val
            }
        case actionTypes.SELECT_FUNCTION:
             return {
                 ...state,
                 selMaterial: action.val
             }
    }
    return state;
};

export default reducer;