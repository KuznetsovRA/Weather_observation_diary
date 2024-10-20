import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import App from './App.tsx'
import './index.scss'
import {store} from './store/store.ts';


async function enableMocking() {
	const { worker } = await import('./mocks/browser')
	return worker.start()
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Provider  store={store}>
				<App />
			</Provider>
		</StrictMode>,
	)
})
