import React from 'react';
import ChartingControls from './charting-controls';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>
          Sample Data 
        </h4>
        <p>c244613c-443b-4dbc-b278-747d982d6f84  -  1524835983</p>
        <p>bd2b4a7a-d1c4-4799-b690-f8a69a2c64ab - 1524835963</p>
        <p>6bc53680-a246-48d9-bccf-2a1f3541df04 - 1524835933</p>
        <p>b79e1e4c-674b-4bbb-a6ce-5f9fcb110afc - 1524835873</p>
        <p>d75c54d3-e672-4580-8bd1-b39ea9c66e93 - 1524835633</p>
        <p>e361f54d-bf60-46bf-be64-51040b835383 - 1524835603</p>
        <p>741c36ef-f2fa-471a-8d5f-ce12b34bbec6 - 1524835653</p>
        <p>b29a8ccc-6653-46f0-93fb-4bd484b5643e</p>
        <ChartingControls />
      </header>
    </div>
  );
}

export default App;
