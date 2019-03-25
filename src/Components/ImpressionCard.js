import React from 'react'

const ImpressionCard = (props) => {
  let { impressionObj } = props;

// "Tiffany's Iridescence: ..." will have an impression with "TITLE" as title
// technically, all props from ExhibitionProfile can be accessed and rendered here

  return (
    <div className="impression-card">
      <h2>{impressionObj.title}</h2>
      <p>{impressionObj.content}</p>
    </div>
  )
}

export default ImpressionCard;
