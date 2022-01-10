
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
				<a className="btn btn-primary btn-xl"
					href="#rolam">Rólam</a>
				<a className="btn btn-primary btn-xl"
					href="#versek">Versek</a>
				<a className="btn btn-primary btn-xl"
					href="#irasok">Írások</a>

			</div>
			<div class="App-header">
				<Header />
				<hr class="hline" id="rolam"></hr>
				<Rolam />
				<hr class="hline" id="versek"></hr>
				<Versek />
				<hr class="hline" id="irasok"></hr>
				<Irasok />
				<hr class="hline"></hr>
				<Footer />
			</div>
    </div>
  );
}

export default App;
