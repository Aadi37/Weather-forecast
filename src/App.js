import './App.css';
import Header from './Header/Header';
import WeatherWidget from './Component/WeatherWidget'
import Footer from './Header/footer';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='PlayArea'>
          <Header/>
       <WeatherWidget/>
       <Footer/>
        </div>
      </div>
       
    </div>
  );
}

export default App;
