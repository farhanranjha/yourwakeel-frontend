import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard />
        </QueryClientProvider>
    );
}

export default App;
