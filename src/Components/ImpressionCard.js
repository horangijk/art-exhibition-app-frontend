import React from 'react'

const ImpressionCard = (props) => {
  let { impressionObj } = props;

// "Tiffany's Iridescence: ..." will have an impression with "TITLE" as title
// technically, all props from ExhibitionProfile can be accessed and rendered here

  return (
    <div>
      <h2>{impressionObj.title}</h2>
    </div>
  )
}

export default ImpressionCard;
