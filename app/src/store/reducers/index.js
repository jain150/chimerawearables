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
    maxYear: 2019,
    venueFilter: 'All',
    sourceFilter: 'Both',

    categories: ['Function', 'BodyZones', 'Fabrication', 'Material'],
    functions: ['Storage', 'Breathability', 'Energy Harvesting', 'Feedback',
     'Display', 'Electronic Elements Connections', 'Wireless Communication', 'Control', 'Movement',
      'Sensing', 'Protective', 'Magnetic', 'Cognitive', 'Modularity', 'Emissivity',
    'Wearability', 'Morphology', 'Aesthetics', 'Gestures'],
    bodyZones: ['Head', 'Chest', 'Pelvic Region', 'Arms', 'Legs',
    'Wrist and Hand', 'Back', 'Full Body', 'Feet'],
    fabrication: ['Stiching/Sewing', 'Laser Cutting', 'Weaving', '3D Printing',
     'Layering', 'Printing', 'Sticking', 'Head Pressing', 'Heat Transfer',
      'Soldering', 'Origami', 'Molding and Casting', 'Pleating and Folding',
      'Knit', 'Embroidery and Applique', 'Beading', 'Quilting',
      'Patchwork and Pattering', 'Woven', 'Non Woven', 'Machining', 'Painting'],
    material: ['Illumination', 'Conductive Inks', 'Polymers', 'Molding Materials',
    'Threads', 'Conductive Threads','Adhesives', 'Paper and Cardboard', 'Electronics',
    'Textile and Composites', 'Bonded', 'Jaquard', 'Hide', 'Hardware', 'Organic Materials',
    'Inks & Finishes', 'Metal', 'Shape Memory Alloy', 'Fabrics'],

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

    bookMarks: [],
    viewBookmarks: false,

    isLoggedIn: false,
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

          case actionTypes.REMOVE_SEARCH_DISPLAY:
          return {
            ...state,
            searchDisplay: false,
            searchTermDisplay: false,
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
          case actionTypes.UPDATE_BOOKMARKS:

              let temp = [...state.bookMarks];

              var index = temp.indexOf(action.val);

              if (index > -1) {
                 temp.splice(index, 1);
              }

              else {
                temp.push(action.val);
              }

              let jsonToSend = JSON.stringify({
                   username: state.username,
                   password: state.password,
                   bookmarks: temp
               })

              var request = new Request('https://chimerabackend.herokuapp.com/api/editPreferences/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: jsonToSend
                  });
                  fetch(request).then(function(response){

                     if(response.status.toString() === '200') {
                        response.text().then(function(text) {

                            var objReceived = JSON.parse(text);
                            if (objReceived.message === 'SUCCESS') {

                               console.log("Updated");
                            }

                        })
                      }
                  })

              return {
                ...state,
                bookMarks: temp,
              }

          case actionTypes.VIEW_BOOKMARKS: {

            return {
              ...state,
              viewBookmarks: (!state.viewBookmarks),
            }

          }

          case actionTypes.AUTH_SUCCESS: {

            console.log(action);
            return {
              ...state,
              isLoggedIn: true,
              username: action.valName,
              password: action.valPassword,
              bookMarks: action.val
            }
          }

          case actionTypes.AUTH_FAILURE: {

            return {
              ...state,
              isLoggedIn: false,
            }
          }
    }
    return state;
};

export default reducer;
