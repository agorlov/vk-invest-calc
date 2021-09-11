import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import './Home.css';
import Graph from '../Graph';
// import Graph2 from '../Graph2';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, List, FormItem, Input } from '@vkontakte/vkui';


class Home extends Component {
	constructor(props) {
        super(props);

        this.state = {
			'доходность' : 20,
			'горизонт инвестирования' : 30,
			'начальная сумма' : 10000,
			'ежемесячная сумма' : 1350, // 300р в неделю
			'сумма инвестиций' : 0,
			'сумма итоговая' : 0,
			'накопление по периодам' : [],
			'накопление для вывода' : [],
			'период для вывода' : 'Год'
        };

    }	

	render() {
		let id = this.props.id;

		return (
			<Panel id={id}>
				<PanelHeader>Магия сложного процента</PanelHeader>

				<Group>

					{/* История про Франклина Рузвельта, про Эйншейна, пример с ипотекой, Машиной итд */}
					<Div>

					Магия в кратном увеличении сумм. Нужна цель, и регулярность пополнения.<br/>
				
					https://moneypapa.ru/slozhnyj-procent-ego-chudo-sila/<br/>
				
					life and invest
					</Div>

				</Group>

		
		
				<Group header={<Header mode="secondary">Когда я заработаю миллион?</Header>}>
					<FormItem top="Доходность портфеля, % годовых">
						<Input 
							type="number"
							defaultValue={this.state['доходность']}
							pattern="\d*"
							onChange={evt => this.changeDohodnost(evt)}
						/>
					</FormItem>
					<FormItem top="Горизонт инвестирования, лет">
						<Input
							type="number"
							defaultValue={this.state['горизонт инвестирования']}
							pattern="\d*"
							onChange={evt => this.changeGorizont(evt)}
						/>
					</FormItem>
					<FormItem top="Начальная сумма, руб.">
						<Input
							type="number"
							defaultValue={this.state['начальная сумма']}
							pattern="\d*"
							onChange={evt => this.changeStartSum(evt)}
						/>
					</FormItem>			  
					<FormItem top="Пополнения ежемесячные, руб.">
						<Input
							type="number"
							defaultValue={this.state['ежемесячная сумма']}
							pattern="\d*"
							onChange={evt => this.changeMonthSum(evt)}
						/>
					</FormItem>
		
					<FormItem>
					<Button stretched size="l" mode1="secondary" onClick={evt => this.calc()} >
						Посчитать
					</Button>
					</FormItem>
		
				</Group>
				<Group className="result-sum" header={<Header mode="secondary">Результат рассчета</Header>}>
					<Div>Внесено: <span className="result-sum__invested">{this.state['сумма инвестиций']} руб.</span></Div>
					<Div>Стало: <span className="result-sum__total">{this.state['сумма итоговая']} руб.</span></Div>
				</Group>

				<Group header={<Header mode="secondary">Динамика накопления</Header>}>

					<Graph data={this.state['накопление для вывода']}></Graph>
					{/* <Graph data={this.state['накопление по периодам']}></Graph> */}

					<List>
						{/* <Cell expandable before={<Div>месяц</Div>}>Сумма, ₽</Cell> */}
						<div className="sumstring">
							<div className="sumstring__month">{this.state['период для вывода']}</div> Сумма, ₽
						</div>
						{this.state['накопление для вывода'].map(
							(sum, index) => (<div className="sumstring" key={index}>
												<div className="sumstring__month">{index + 1}</div>
												{Math.round(sum)}
												{/* <span className="sumstring__delta">+100</span> */}
											</div>)
						)}
					</List>
				</Group>				
		
				
				
		
				<Group header={<Header mode="secondary">Navigation Example</Header>}>
					<Div>
						<Button stretched size="l" mode="secondary" onClick={this.props.go} data-to="persik">
							Что такое магия сложного процента?
						</Button>
					</Div>
				</Group>
		
		
		
			</Panel>
		);
	}

	/**
	 * Посчитать накопление по месяцам
	 * 
	 * С учетом того, что каждый месяц начисляется 1/12 часть годовой ставки
	 * Рассчитанное значение устанвливается в this.state 
	 * 	обновляются
	 * 		- сумма инвестиций
	 * 		- сумма итоговая
	 *  	- накопление по периодам
	 * 		- накопление для вывода
	 * 		- период для вывода
	 * 
	 * @return {void}
	 */
	calc() {
		let nakopleniePoPeriodam = []; // 1 по прошествии первого года, 2 второго года
		
		let prevSum = this.state['начальная сумма'];
		
		for (let month = 0; month < this.state['горизонт инвестирования'] * 12; month++ ) {				

			nakopleniePoPeriodam[month] =
					prevSum + // сумма предыдущих месяцев
					prevSum * (this.state['доходность'] / 100 / 12) +
					this.state['ежемесячная сумма'];

			prevSum = nakopleniePoPeriodam[month];
		}

		let formatter = new Intl.NumberFormat(
			'ru-RU', 
			{
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			}
		);
		

		this.setState({
			'сумма инвестиций' :  formatter.format(this.state['начальная сумма'] + 
								  				  this.state['ежемесячная сумма'] * this.state['горизонт инвестирования'] * 12),
			'сумма итоговая' : formatter.format(nakopleniePoPeriodam[nakopleniePoPeriodam.length - 1]),
			'накопление по периодам' : nakopleniePoPeriodam,
			'накопление для вывода' : this.nakoplenieDliaVivoda(nakopleniePoPeriodam).nakoplenie,
			'период для вывода' : this.nakoplenieDliaVivoda(nakopleniePoPeriodam).period
		});	
	}

	/**
	 * Группировка вывода, для продолжительных горизонотов по годам
	 * 
	 * Если срок инвестирования больше 3х лет, группируем вывод сумм по годам
	 * Если срок инвестирования больше 3года или меньше лет, группируем вывод сумм месяцам
	 * 
	 * @param {*} nakopleniePoPeriodam 
	 * @returns 
	 */
	nakoplenieDliaVivoda(nakopleniePoPeriodam) {

		if (nakopleniePoPeriodam.length <= 36) {
			return {
				period: 'Месяц',
				nakoplenie: nakopleniePoPeriodam
			};
		}

		// let formatter = new Intl.NumberFormat(
		// 	'ru-RU', 
		// 	{
		// 		minimumFractionDigits: 0,
		// 		maximumFractionDigits: 0
		// 	}
		// );


		let nakopleniePoGodam = [ ];

		for (let i = 11; i < nakopleniePoPeriodam.length; i = i + 12) {
			nakopleniePoGodam.push(nakopleniePoPeriodam[i]);
		}

		return {
			period: 'Год',
			nakoplenie: nakopleniePoGodam,
		};
	}

	changeDohodnost(evt) {
		this.setState({
			'доходность' : Number(evt.target.value)
		});
	}

	changeGorizont(evt) {
		this.setState({
			'горизонт инвестирования' : Number(evt.target.value)
		});
	}	

	changeStartSum(evt) {
		this.setState({
			'начальная сумма': Number(evt.target.value)
		});
	}		

	changeMonthSum(evt) {
		this.setState({
			'ежемесячная сумма': Number(evt.target.value)
		});
	}			
}


export default Home;
