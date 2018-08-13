import React from 'react'
import PropTypes from 'prop-types'

const ListPhoto = ({ photos, openModal }) => {
  return photos.map((photo, index) => (
    <div key={index} className="photo">
      <p>
        <img src={photo.sizes[0].url} alt="" onClick={() => openModal(index)} />
      </p>
      <p>{photo.likes.count} ❤</p>
    </div>
  ))
}

export default ListPhoto

ListPhoto.propTypes = {
  photos: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}
