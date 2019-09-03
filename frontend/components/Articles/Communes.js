import React, { Component } from "react";
import axios from "axios";
import { API_COMMUNES } from "../../config";
import { Button } from 'antd';

export default class Communes extends Component {
  componentDidMount() {
    axios
      .get(API_COMMUNES)
      .then(response => this.setState({ communes: response.data }));
  }
  state = {
    communes: []
  };
  render() {
    console.log(this.state.communes);
    return (
      <div>
       <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
    <Button type="primary" shape="round" icon="download" size="large" />
      </div>
    );
  }
}
