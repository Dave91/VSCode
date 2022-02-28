const HideShow = () => {
  const [showDivItem, setShowDivItem] = React.useState(false)
  const onClick = () => setShowDivItem(showDivItem ? false : true)
  return (
    <div>
      <input type="submit" value= { showDivItem ? "Hide" : "Show" } onClick={onClick} />
      { showDivItem ? <DivItem /> : null }
    </div>
  )
}

const DivItem = () => (
  <div id="divitem" className="show-divitem">
    <h3>Title</h3>
		Show some div item contents here...
  </div>
)

ReactDOM.render(<HideShow />, document.querySelector("#hiddencontent"))

/*
something like this goes into html file:
in upper body:
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"></script>

where needed:
<div id="hiddencontent"></div>
<div>
  <script src="./hideshow.jsx"></script>
</div>
*/
