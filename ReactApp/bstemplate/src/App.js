import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import Navbar from './Navbar';
import Header from './Header';
import Sections from './Sections';
import Footer from './Footer';

function App() {
  return (
    <div class="App-nav">
			<div class="fixed-top">
				<Navbar />
			</div>
			<div class="App-header">
				<Header />
				<Sections />
				<Footer />
			</div>
    </div>
  );
}

export default App;
