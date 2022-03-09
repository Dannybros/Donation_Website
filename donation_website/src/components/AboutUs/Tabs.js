import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    localStorage.setItem('about', tab)
    this.setState({ activeTab: tab });
  }
  
  render() {
    const {
      onClickTabItem,
      props: {
        children,
      }
    } = this;

    const tabb = localStorage.getItem('about')

    return (
      <div className="tabs">
        <ul className="tab-list">
          {children.map((child) => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={tabb}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== tabb) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;