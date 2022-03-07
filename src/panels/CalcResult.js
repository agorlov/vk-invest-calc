import { Panel, PanelHeader, PanelHeaderBack, Header, Button, Group, Cell, Div, List, FormItem, Input } from '@vkontakte/vkui';
import React, {Component} from 'react';
import Graph from '../Graph';


/**
 * @todo Страница для вывода расчета сложного процента (эксперимент)
 */
class CalcResult extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		let id = this.props.id;

		return (
			<Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={this.props.go} data-to="home"/>}
                >
                Рассчет
                </PanelHeader>		
		
			</Panel>
		);
	}
}


export default CalcResult;
