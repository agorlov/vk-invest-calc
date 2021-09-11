import React from "react";
import { Div } from '@vkontakte/vkui';

import Chart from 'chart.js/auto';
// var Chart = require("chart.js");

/**
 * График накоплений
 * 
 * @author agorlov
 */
class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log('Graph did update', prevProps);
    console.log('Props', this.props);

    const node = this.node;

    if (! this.props) {
        return;
    }

    if (this.myChart) {
        this.myChart.destroy();
    }

    this.myChart = new Chart(node, {
      type: "bar",
      data: {
        labels: this.props.data,
        datasets: [
          {
            label: "# of Likes",
            data: this.props.data,
            // backgroundColor: [
            //   "rgba(255, 99, 132, 0.2)",
            //   "rgba(54, 162, 235, 0.2)",
            //   "rgba(255, 206, 86, 0.2)"
            // ]
          }
        ]
      }
    });
    

  }

//   componentWillReceiveProps() {
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//       console.log('getSnapshotBeforeUpdate', prevProps, prevState);
//       return null;
//   } 

  componentDidMount() {
    console.log('Graph did mount!');
  }

  render() {
    console.log('Graph render', this.props);
    return (
      <Div>
        <div>Канва: {this.props[0]}</div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </Div>
    );
  }
}

export default Graph;