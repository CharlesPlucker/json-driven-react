import React, { Component } from 'react'
import JsonComponentize from './JsonComponentize'

class JsonDrivenReact extends Component {
  render() {
    if (!this.props || !this.props.json) return null

    let jsonComponentize = new JsonComponentize(this.props.translate)

    return this.toReact(jsonComponentize.translate(this.props.json))
  }

  toReact(json) {
    if (Array.isArray(json) || (json && typeof json === 'object')) {
      return ([].concat(json).map((item, index) => {
        // Supply a React key if none given
        item.props = item.props || {}
        item.props.key = item.props.key || index

        if (item.children) {
          return React.createElement(
            item.element,
            item.props,
            ...this.toReact(item.children))
        } else {
          return React.createElement(
            item.element,
            item.props)
        }
      }))
    } else {
      // Json is plain content
      return json
    }
  }
}

JsonDrivenReact.defaultProps = {
  translate: {}
}

export default JsonDrivenReact
