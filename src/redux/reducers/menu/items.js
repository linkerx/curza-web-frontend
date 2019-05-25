export default function(state = null,action) {
  switch(action.type){
    case 'MENU_ITEMS_FETCH':
      if(!action.error){
        return action.payload.data;
      }
      else return state;
    default:
  }
  return state
}
