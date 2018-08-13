import React from 'react'
import Modal from 'react-modal'
import ListPhoto from './ListPhoto'
import BigPhoto from './BigPhoto'
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
      activeUrl: '',
    }
  }

  openModal = url => {
    this.setState({ modalIsOpen: true, activeUrl: url })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, activeUrl: '' })
  }

  render() {
    const { photos } = this.props
    const { modalIsOpen, activeUrl } = this.state
    return (
      <React.Fragment>
        <ListPhoto photos={photos} openModal={this.openModal} />
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
          onRequestClose={this.closeModal}
        >
          <BigPhoto url={activeUrl} />
        </Modal>
      </React.Fragment>
    )
  }
}

PhotoManager.propTypes = {
  photos: PropTypes.array.isRequired,
}
