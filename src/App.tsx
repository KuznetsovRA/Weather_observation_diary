import React, { useState } from 'react';
import { Button } from 'primereact/button';
import DialogAddRecord from './components/dialog/dialog-add-record.tsx';
import './App.scss';
import { WeatherTable } from './components/table/weather-table.tsx';

const App: React.FC = () => {
	const [visible, setVisible] = useState(false);

	return (
		<div className="App">
			<div className="header">
				<h1>Дневник погоды</h1>
				<Button label="Добавить" onClick={() => setVisible(true)} />
			</div>

			<div className="table-container">
				<WeatherTable />
			</div>

			<DialogAddRecord visible={visible} setVisible={setVisible} />

		</div>
	);
};

export default App;
