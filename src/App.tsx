import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';
import StoryPage from './pages/StoryPage/StoryPage';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/story/:id' element={<StoryPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
