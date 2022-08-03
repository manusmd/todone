import './App.css';
import { NhostClient, NhostReactProvider } from '@nhost/react';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './pages/Signup/SignUp';
import SignIn from './pages/SignIn/SignIn';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { NhostApolloProvider } from '@nhost/react-apollo';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ChakraProvider>
      </NhostApolloProvider>
    </NhostReactProvider>
  );
}

export default App;
