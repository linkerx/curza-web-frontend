export default function(state = false,action) {

  switch(action.type){
    case 'HEADER_SHOW':
      return true;
    case 'HEADER_HIDE':
      return false;
    default:
  }
  return state
}
