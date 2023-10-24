import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import { store } from './redux/store';

const rootElem = document.getElementById('root');

if (rootElem) {
  ReactDOM.createRoot(rootElem).render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>,
  );
}
