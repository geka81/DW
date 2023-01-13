import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from './reportWebVitals';
import Routes from "./Routes";
import { AuthContextProvider } from './components/chat/AuthContext';
import { ChatContextProvider } from './components/chat/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthContextProvider>
		<ChatContextProvider>
			<React.StrictMode>
				<Routes />
			</React.StrictMode>
		</ChatContextProvider>
	</AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.unregister();
