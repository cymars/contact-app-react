import ActionTypes from '../actions/ActionTypes'

const initialState = {
    pending: false,
    success: false,
    user: [],
    fail: false,
    error: "",
}


const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_USERS_START:
            return {
                ...state,
                pending: true,
            }

        case ActionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail:false,
                user:action.payload
            }
        case ActionTypes.GET_USERS_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            };
           
    case ActionTypes.DELETE_USER_START:
        return {
          ...state,
          pending: true,
        };
      case ActionTypes.DELETE_USER_SUCCESS:
        var filteredUser = state.user.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          pending: false,
          success: true,
          fail: false,
          user: filteredUser,
        };
      case ActionTypes.DELETE_USER_FAIL:
        return {
          ...state,
          pending: false,
          success: false,
          fail: true,
          error: action.payload,
        };
        case ActionTypes.ADD_USER_START:
          return {
            ...state,
            user: [...state.user, action.payload],
          };
          case ActionTypes.EDIT_BOOK:
            var temp = [];
            for (let i = 0; i < state.user.length; i++) {
              if (state.user[i].id !== action.payload.id) {
                temp.push(state.user[i]);
              } else {
                temp.push(action.payload);
              }
            }
      
            return {
              ...state,
             user: temp,
            };
        default:
            return state;
}
};
  
export default Reducer;
