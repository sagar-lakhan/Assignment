const initial_State = {
    request: [],
    client:{}
  };
  
  export default function(state = initial_State, action) {
    switch (action.type) {
      case "ADD_FOOD_ITEM":
        return {
          ...state,
          request: [...state.request,action.payload]
        };
      case "REMOVE_FOOD_ITEM":
        return {
          ...state,
          request: action.payload
        };
      case "SET_CLIENT":
          return {
            ...state,
            client: action.payload
          };
      case "REMOVE_CLIENT":
            return {
              ...state,
              client: action.payload
            };
      default:
        return state;
    }
  }
  