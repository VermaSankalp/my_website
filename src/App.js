import { React } from 'react';
import MyNavbar from './components/Navbar/Navbar';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <MyNavbar />
    </Provider>
  )
}

export default App;