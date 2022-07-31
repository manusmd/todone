import './App.css';
import { NhostClient, NhostReactProvider } from '@nhost/react';

const nhost = new NhostClient({
  subdomain: import.meta.env.REACT_APP_NHOST_SUBDOMAIN,
  region: import.meta.env.REACT_APP_NHOST_REGION,
});

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <h1>Hello World!</h1>
    </NhostReactProvider>
  );
}

export default App;
