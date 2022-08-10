const Notification = ({ text }) => {
  const style = {
    padding: 5,
    background: 'red',
  }
  if (text) {
    return (
      <div style={style}>{text}</div>
    )
  } else {
    return (<></>)
  }
}

export default Notification