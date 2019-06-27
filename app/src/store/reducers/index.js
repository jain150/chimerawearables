import * as actionTypes from '../actions';

const initialState = {

    searchDisplay: false,
    searchData: [],
    names: [],
    params: [],

    listDisplay: false,

    searchTermDisplay: false,
    searchTermQuery: '',

    filter: true,
    minYear: 1990,
    maxYear: 2018,
    venueFilter: 'all',
    sourceFilter: 'both',

    categories: ['Function', 'BodyZones', 'Fabrication', 'Material'],
    functions: ['Storage', 'Breathability', 'Energy Harvesting', 'feedback',
     'Display', 'Electronic Elements Connections', 'Wireless Communication', 'Control', 'Movement',
      'Sensing', 'Protective', 'Magnetic', 'Cognitive', 'Modularity', 'Emissivity',
    'Wearability', 'Morphology', 'Aesthetics', 'Gestures'],
    bodyZones: ['Head', 'Chest', 'Pelvic Region', 'Arms', 'Legs',
    'Wrists & Hand', 'Back', 'Full Body', 'Feet'],
    fabrication: ['Stiching/Sewing', 'Laser Cutting', 'Weaving', '3D Printing',
     'Layering', 'Printing', 'Sticking', 'Head Pressing', 'Heat Transfer',
      'Soldering', 'Origami', 'Molding and Casting', 'Pleating and Folding',
      'Knit', 'Embroidery and Applique', 'Beading', 'Quilting',
      'Patchwork and Pattering', 'Woven', 'Non Woven', 'Machining', 'Painting'],
    material: ['Illumination', 'Conductive Inks', 'Polymers', 'Molding Materials',
    'Threads', 'Conductive Threads','Adhesives', 'Paper and Cardboard', 'Electronics',
    'Textile and Composites', 'Bonded', 'Jaquard', 'Hide', 'Hardware', 'Organic Materials',
    'Inks & Finishes', 'Metal', 'Shape Memory Alloy'],

    arrFunc: [],
    arrBod: [],
    arrFab: [],
    arrMat: [],

    selFunction: '',
    selBodyZones: '',
    selFabrication: '',
    selMaterial: '',

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

        case actionTypes.PRE_SELECT_FUNC:
           return {
                ...state,
                arrFunc: [...action.value]
           }

        case actionTypes.PRE_SELECT_BOD:

           return {
                ...state,
                arrBod: [...action.value]
           }

        case actionTypes.PRE_SELECT_FAB:
           return {
                ...state,
                arrFab: [...action.value]
           }

        case actionTypes.PRE_SELECT_MAT:
           return {
                ...state,
                arrMat: [...action.value]
           }
        case actionTypes.UPDATE_DATA:
          return {
            ...state,
            searchData: [...action.value]
          }
          case actionTypes.SEARCH_DISPLAY:
            return {
              ...state,
              searchDisplay: true,
            }
          case actionTypes.UPDATE_QUERY:
            return {
              ...state,
              names: [...action.names],
              params: [...action.params]
            }
          case actionTypes.FILTER_DATA:
            return {
              ...state,
              filter: true,
            }
          case actionTypes.FILTER_YEAR:
            return {
              ...state,
              minYear: action.minYear,
              maxYear: action.maxYear,
            }
          case actionTypes.FILTER_VENUE:
            return {
              ...state,
              venueFilter: action.val,
            }
          case actionTypes.FILTER_SOURCE:
            return {
              ...state,
              sourceFilter: action.val,
            }
          case actionTypes.TOGGLE_DISPLAY:
            return {
              ...state,
              listView: (!state.listView),
            }
          case actionTypes.SEARCH_TERM_DISPLAY:
            return  {
              ...state,
              searchTermDisplay: true,
            }
          case actionTypes.SEARCH_TERM_QUERY:
            return {
              ...state,
              searchTermQuery: action.val,
            }
    }
    return state;
};

export default reducer;
