import React from 'react'
import Modal from 'react-modal'
import ListPhoto from './ListPhoto'
import PropTypes from 'prop-types'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
}

export default class PhotoManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      activeIndex: -1,
    }
  }

  openModal = index => {
    this.setState({ modalIsOpen: true, activeIndex: index })
  }

  closeModal = index => {
    this.setState({ modalIsOpen: false, activeIndex: -1 })
  }

  render() {
    const { photos } = this.props
    const { modalIsOpen, activeIndex } = this.state
    return (
      <React.Fragment>
        <ListPhoto photos={photos} openModal={this.openModal} />
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
          onRequestClose={this.closeModal}
        >
          {activeIndex >= 0 && (
            <div>
              <img src={photos[activeIndex].sizes[4].url} alt="" />
            </div>
          )}
        </Modal>
      </React.Fragment>
    )
  }
}

PhotoManager.propTypes = {
  photos: PropTypes.array.isRequired,
}
