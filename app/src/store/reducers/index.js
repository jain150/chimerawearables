import * as actionTypes from '../actions';

const initialState = {

    categories: ['Function', 'BodyZones', 'Fabrication', 'Material'],
    functions: ['store', 'breathability', 'feedback'],
    bodyZones: ['head', 'chest', 'pelvic region', 'arms', 'legs',
    'wrists & hand', 'back', 'full body', 'feet'],
    fabrication: ['weaving', 'layering', 'painting'],
    material: ['polymers', 'threads', 'adhesives'],
    selFunction: null,
    selBodyZones: null,
    selFabrication: null,
    selMaterial: null,

    showFunc: false,
    showBod: false,
    showFab: false,
    showMat: false,

};

const reducer = ( state = initialState, action ) => {

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
        case actionTypes.SELECT_MATERIAL:
             return {
                 ...state,
                 selMaterial: action.val
             }
        case actionTypes.SHOW_FUNC:
            return {
              ...state,
              showFunc: !(state.showFunc)
            }
        case actionTypes.SHOW_BOD:
            return {
                ...state,
                showBod: !(state.showBod)
            }
        case actionTypes.SHOW_FAB:
           return {
               ...state,
               showFab: !(state.showFab)
           }
        case actionTypes.SHOW_MAT:
           return {
               ...state,
               showMat: !(state.showMat)
           }
    }
    return state;
};

export default reducer;