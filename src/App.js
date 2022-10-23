
import './App.css';
import Home from './home';
import GoogleMaps from './second';

function App() {
  return (
    <div className="App"
      style={{

        width: '100%',
        height: '100vh',
        paddingTop: '40px',
        paddingLeft: '20%',
        paddingRight: '20%'
      }}
    >

      <GoogleMaps />
    </div>
  );
}

export default App;
