import React from "react";
import { Div } from '@vkontakte/vkui';

import Chart from 'chart.js/auto';


/**
 * График накоплений
 * 
 * Параметры (props)
 * @param data массив объектов [ { step: 1, sum: 1000 }, ... ], для вывода на графике
 * 
 * @author agorlov
 */
class Graph extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidUpdate(prevProps, prevState, prevContext) {
    // console.log('Graph did update', prevProps);
    // console.log('Props', this.props);

    const node = this.node;

    if (! this.props.data) {
        return;
    }

    if (this.myChart) {
        this.myChart.destroy();
    }


    Chart.defaults.backgroundColor = 'rgba(54, 162, 235, 0.2)';
    

    this.myChart = new Chart(node, {
      type: "bar",
      data: {
        labels: this.props.data.map((p, index) => { return p.step; }),
        datasets: [
          {
            label: "Ваша сумма, руб.",
            data: this.props.data,
            borderColor: 'rgba(54, 162, 235, 1)'
          }
        ]
      },      
      options: {
        parsing: {
          xAxisKey: 'step',
          yAxisKey: 'sum'
        },        
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
    });
    

  }

  componentDidMount() {
    // console.log('Graph did mount!');
  }

  render() {
    // console.log('Graph render', this.props);
    return (
      <Div>
        {/* <div>Канва: {this.props[0]}</div> */}
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </Div>
    );
  }
}

export default Graph;