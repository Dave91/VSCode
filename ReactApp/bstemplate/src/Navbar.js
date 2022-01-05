import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

function Navbar() {
  return (
		<nav class="navbar navbar-light bg-light">
			<form class="form-inline">
				<a className="btn">.   ..:: DAVE BLOGJA ::..   .</a>
				<a className="btn btn-primary btn-xl"
					href="#rolam">Rólam</a>
				<a className="btn btn-primary btn-xl"
					href="#versek">Versek</a>
				<a className="btn btn-primary btn-xl"
					href="#irasok">Írások</a>
				<a className="btn btn-primary btn-xl"
					href="#termfotok">Természetfotók</a>
				<a className="btn btn-primary btn-xl"
					href="#szorak">Szórakozás</a>
				<a className="btn btn-primary btn-xl"
					href="#hasznos">Hasznos linkek</a>
			</form>
		</nav>
  );
}

export default Navbar;
