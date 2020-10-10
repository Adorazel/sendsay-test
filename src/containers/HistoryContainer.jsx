import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withSendsay} from "../hoc"
import {deleteHistoryItem, purgeHistory, setRequestBody, setResponseBody, send} from "../actions"
import {compose, copyToClipboard} from "../utils"
import {History} from "../components"


class HistoryContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      copiedId: null
    }
  }

  doItem = id => {
    const {send, historyItems, setRequestBody, setResponseBody} = this.props
    const {query} = historyItems.find(item => item.id === id)
    if (query) {
      setResponseBody("")
      setRequestBody(JSON.stringify(query, null, 2))
      send({query})
    }
  }

  copyItem = id => {
    this.setState({copiedId: null}, () => {
      const {historyItems} = this.props
      const {query} = historyItems.find(item => item.id === id)
      if (query && copyToClipboard(JSON.stringify(query, null, 2))) {
        this.setState({copiedId: id})
      }
    })

  }

  deleteItem = id => {
    const {deleteHistoryItem} = this.props
    deleteHistoryItem(id)
  }

  cleanHistory = () => {
    const {purgeHistory} = this.props
    purgeHistory()
  }


  render() {
    const {doItem, copyItem, deleteItem, cleanHistory} = this
    const {historyItems} = this.props
    const {copiedId} = this.state
    const historyProps = {historyItems, doItem, copyItem, deleteItem, cleanHistory, copiedId}
    return <History {...historyProps}/>
  }
}

const mapStateToProps = ({history: {items: historyItems}}) => ({historyItems})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  send: send(sendsayService),
  deleteHistoryItem,
  purgeHistory,
  setRequestBody,
  setResponseBody
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryContainer)