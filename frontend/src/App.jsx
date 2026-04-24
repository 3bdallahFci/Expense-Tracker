import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/ui/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import TransactionPage from './pages/TransactionPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@apollo/client/react';
import { GET_USER } from './graphql/queries/user.query.js';

function App() {
	const { data,loading,error } = useQuery(GET_USER);
	
	if (loading) return null;

	console.log(data);
	
	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data.authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data.authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data.authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data.authUser ? <TransactionPage /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</>
	);
}
export default App;