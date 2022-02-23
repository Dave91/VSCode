
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import Header from './Header';
import Rolam from './Rolam';
import Versek from './Versek';
import Irasok from './Irasok';
import Footer from './Footer';

// mutassa mindig az adott sect részt
// alapból Header jelenik meg

function App() {
	
	return (
    <div class="App">
			<div class="navb fixed-top">
				<a className="btn btn-primary btn-xl">Rólam</a>
				<a className="btn btn-primary btn-xl">Versek</a>
				<a className="btn btn-primary btn-xl">Írások</a>
				<hr />
			</div>
			<div class="content">
				<section>
					<Header />
				</section>
				<section>
					<Footer />
				</section>
			</div>
    </div>
  );
}

export default App;
