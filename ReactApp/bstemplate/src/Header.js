import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

function Header() {
  return (
		<header className="masthead">
			<div className="header-content">
				<div className="header-content-inner">
					<h1 id="homeHeading">Irodalmi, fényképes, kulturális portál</h1>
					<hr />
					<p>Lectori salutem, azaz üdv az Olvasónak! :)</p>
					<p>
						Versek, haikuk és tankák többféle témában, valamint amatőr
						természetfotók mellett egyéb érdekességeket is találhat a kedves
						Látogató.
					</p>
					<a className="btn btn-primary btn-xl" href="#rolam">
						Tudj meg többet
					</a>
				</div>
			</div>
		</header>
  );
}

export default Header;
