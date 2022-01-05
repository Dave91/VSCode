import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

function Sections() {
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 mx-auto text-center">
						<h2 className="section-heading text-white"
							id="rolam">
								Rólam
						</h2>
						<p className="text-faded">
							text <br /><br />

							Text text text text
						</p>
					</div>
				</div>
			</div>

			<div className="container text-center">
				<h2 className="section-heading" id="versek">Versek</h2>
			</div>
			<div className="container">
				<div className="wrapper">
					<div className="box">
						<div className="text">
							<h5>Versek</h5>
							<p>
								text text text
							</p>
						</div>
					</div>
					<div className="box">
						<div className="text">
							<h5>Versek2</h5>
							<p>
								text text text
							</p>
						</div>
					</div>
					<div className="box">
						<div className="text">
							<h5>Versek3</h5>
							<p>
								text text text
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-lg-12 text-center">
						<h2 className="section-heading text-white">Timeline</h2>
					</div>
				</div>
			</div>
			<div>
				<time>Sept.</time>
				<p>
					● Detailed project plan submission<br />
					● Project webpage goes live<br />
					● Literature review<br />
				</p>
			</div>
			<div>
				<time>Oct.</time>
				<p>
					● text text text<br />
					● text text text<br />
				</p>
			</div>
			<div>
				<time>Nov. - Dec.</time>
				<p>
					● text text text<br />
					● text text text<br />
					● text text text<br />
				</p>
			</div>
			<div>
				<time>Jan. - Feb.</time>
				<p>
					● text text text
				</p>
			</div>
			<div>
				<time>Mar. - April.</time>
				<p>
					● text text text<br />
					● text text text<br />
					● text text text<br />
				</p>
			</div>
			<div>
				<time>May</time>
				<p>● text text text<br /></p>
			</div>
			<div className="container text-center">
				<h2 className="section-heading">Írások</h2>
				<p>
					text text text text text text text text text
				</p>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-lg-12 text-center">
						<h2 className="section-heading text-white">Documentations</h2>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-2 col-sm-6">
						<a className="portfolio-box">
						</a>
					</div>

					<div className="col-lg-3 col-sm-6">
						<a className="portfolio-box">
						</a>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-lg-12 text-center">
						<h2 className="section-heading"
							id="hasznos">
								Hasznos linkek
						</h2>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-md-4 text-center team">
						<p>link</p>
						<div className="team-contact-mid">
							
						</div>
					</div>
					<div className="col-md-4 text-center team">
						<p>link</p>
						<div className="team-contact">
							
						</div>
					</div>
					<div className="col-md-4 text-center team">
						<p>link</p>
						<div className="team-contact">
							<a className="App-link">link</a>
						</div>
					</div>
				
				</div>
			</div>
		
		</div>
	);
}

export default Sections;
