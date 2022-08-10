import ReactDOM from 'react-dom/client';
import './css/style.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('root element не найден');

const root = ReactDOM.createRoot(rootElement);
root.render(<App/>);
