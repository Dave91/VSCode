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
