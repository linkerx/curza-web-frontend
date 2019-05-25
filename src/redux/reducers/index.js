import { combineReducers } from 'redux';
import MenuOpenedReducer from './menu/opened';
import MenuItemsReducer from './menu/items';
import HeaderShowReducer from './header/show';

const rootReducer = combineReducers({
  menu_opened: MenuOpenedReducer,
  menu_items: MenuItemsReducer,
  header_show: HeaderShowReducer,
});

export default rootReducer;
