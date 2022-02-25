import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './index.css';
import Header from './Header';
import Footer from './Footer';
import Rolam from './Rolam';
import Versek from './Versek';
import Irasok from './Irasok';

function App() {
  return (
    <div class="App">
			<div class="navb fixed-top">
				<a id="rolam" className="btn btn-primary btn-xl">Rólam</a>
				<a id="versek" className="btn btn-primary btn-xl">Versek</a>
				<a id="irasok" className="btn btn-primary btn-xl">Írások</a>
				<a id="kepek" className="btn btn-primary btn-xl">Képek</a>
				<a id="egyeb" className="btn btn-primary btn-xl">Egyéb</a>
				<a id="egyeb2" className="btn btn-primary btn-xl">Egyéb2</a>
				<a id="egyeb3" className="btn btn-primary btn-xl">Egyéb3</a>
				<a id="egyeb4" className="btn btn-primary btn-xl">Egyéb4</a>
				<hr />
			</div>
			<div id="contsel" class="content">
				<section class="sect-head-foot">
					<Header />
				</section>
				<section class="sect-head-foot">
					<Footer />
				</section>
			</div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    { App() }
  </React.StrictMode>,
  document.getElementById('root')
);

function selSect(iid) {
  return function() {
    var sect = null;
    if (iid === 'rolam') {sect = <Rolam />}
    if (iid === 'versek') {sect = <Versek />}
    if (iid === 'irasok') {sect = <Irasok />}
    ReactDOM.render(
      <React.StrictMode>
        <section class="sect-head-foot">
          { sect }
        </section>
				<section class="sect-head-foot">
					<Footer />
				</section>
      </React.StrictMode>,
      document.getElementById('contsel')
    );
  };
}

const menuItems = document.getElementsByClassName('btn btn-primary btn-xl');
for (const item of menuItems) {
  var itemId = item.id;
  item.onmouseenter = selSect(itemId);
}
