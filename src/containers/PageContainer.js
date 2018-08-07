import React from 'react'
import { connect } from 'react-redux'
import { Page } from '../components/Page'
import { getPhotos } from '../actions/PageActions'

const LAST_5_YEARS = 5

class PageContainer extends React.Component {
  constructor(props) {
    super(props)

    const currentYear = new Date().getFullYear()
    this.years = Array.from(
      { length: LAST_5_YEARS },
      (el, i) => currentYear - i
    ) // массив состоящий из 5-ти последних лет
  }

  render() {
    const { page, getPhotos } = this.props
    return (
      <Page
        photos={page.photos}
        year={page.year}
        isFetching={page.isFetching}
        error={page.error}
        getPhotos={getPhotos}
        years={this.years}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    page: store.page,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: year => dispatch(getPhotos(year)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer)
