import './App.css';
import { NhostClient, NhostReactProvider } from '@nhost/react';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './pages/Signup/SignUp';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <ChakraProvider>
        <SignUp />
      </ChakraProvider>
    </NhostReactProvider>
  );
}

export default App;
