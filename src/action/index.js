export function addFoodItem(payload) {
    return {
      type: "ADD_FOOD_ITEM",
      payload: payload
    };
  }
  
  export function removeFoodItem(payload) {
    return {
      type: "REMOVE_FOOD_ITEM",
      payload: payload
    };
  }

  export function setClient(payload) {
    return {
      type: "SET_CLIENT",
      payload: payload
    };
  }

  export function resetClient(payload) {
    return {
      type: "REMOVE_CLIENT",
      payload: payload
    };
  }
  