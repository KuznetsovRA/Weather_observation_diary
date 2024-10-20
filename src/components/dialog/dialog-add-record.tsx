import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useSaveWeatherRecordMutation } from '../../api/weather-api.ts';
import { Weather } from '../../const.ts';
import { TWeather, TWeatherRecord } from '../../types.ts';
import { formatDate } from '../../utils.ts';
import './dialog-add-record.scss';

interface TDialogAddRecordProps {
	visible: boolean;
	setVisible: (visible: boolean) => void;
}

const DialogAddRecord: React.FC<TDialogAddRecordProps> = ({ visible, setVisible }) => {
	const [selectedFilled, setSelectedFilled] = useState<string | null>(null);
	const [selectedWeather, setSelectedWeather] = useState<TWeather | null>(null);
	const [temperature, setTemperature] = useState<string>(``);
	const [comment, setComment] = useState<string | ''>('');
	const [errors, setErrors] = useState<{ temperature?: string; weather?: string; filledBy?: string }>({});

	const [saveRecord] = useSaveWeatherRecordMutation();
	const { data: users = [] } = useGetUsersQuery();

	const validateTemperature = (tempIn: string) => {
		const temp = Number(tempIn);
		if (temp === null || temp === undefined || tempIn === `` ) {
			return 'Введите температуру';
		}

		if ( temp > 60) {
			return 'T должна быть менее 60';
		}
		if (temp < -50 ) {
			return 'T должна быть более -50';
		}

		const decimalPart = temp.toString().split('.')[1];
		if (decimalPart && decimalPart.length > 2) {
			return 'Не более 2-х знаков после запятой';
		}
		return '';
	};

	useEffect(() => {
		const newErrors = {
			temperature: validateTemperature(temperature),
			weather: selectedWeather ? '' : 'Обязательное поле',
			filledBy: selectedFilled ? '' : 'Обязательное поле',
		};
		setErrors(newErrors);
	}, [temperature, selectedWeather, selectedFilled]);

	const validateForm = () => {
		return !Object.values(errors).some(error => error);
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const weatherData: TWeatherRecord = {
			id: Date.now(),
			dateTime: formatDate(new Date()),
			temperature: Number(temperature),
			weather: selectedWeather as TWeather,
			filledBy: selectedFilled as string,
			comment: comment as string,
		};

		try {
			await saveRecord(weatherData).unwrap();
			setVisible(false);
			resetForm();
		} catch (error) {
			console.error('Error saving record:', error);
		}
	};

	const resetForm = () => {
		setSelectedFilled(null);
		setSelectedWeather(null);
		setTemperature(``);
		setComment('');
		setErrors({});
	};

	return (
		<Dialog
			header="Добавить запись"
			visible={visible}
			className="custom-dialog"
			onHide={() => setVisible(false)}
			modal={true}
			draggable={false}
		>
			<form onSubmit={onSubmit}>
				<div className="form-field">
					<label htmlFor="temperature">Temperature</label>
					<input
						type="number"
						value={temperature? temperature:``}
						onChange={(e) => setTemperature(e.currentTarget.value)}
						min={-50}
						max={60}
						step={0.01}
						className={errors.temperature ? 'error' : ''}
					/>
					<span className="error-text">{errors.temperature || ' '}</span>
				</div>

				<div className="form-field">
					<label htmlFor="weather">Weather</label>
					<Dropdown
						value={selectedWeather}
						onChange={(e) => setSelectedWeather(e.value)}
						options={Weather}
						className={`dropdown ${errors.weather ? 'error' : ''}`}
					/>
					<span className="error-text">{errors.weather || ' '}</span>
				</div>

				<div className="form-field">
					<label htmlFor="filledBy">Filled By</label>
					<Dropdown
						value={selectedFilled}
						onChange={(e) => setSelectedFilled(e.value)}
						options={users.map((user) => ({ label: user.name, value: user.name }))}
						className={errors.filledBy ? 'error' : ''}
					/>
					<span className="error-text">{errors.filledBy || ' '}</span>
				</div>

				<div className="form-field">
					<label htmlFor="comment">Comment</label>
					<InputText value={comment} onChange={(e) => setComment(e.target.value)} />
					<span className="error-text">&nbsp;</span>
				</div>

				<Button label="Сохранить" type="submit" className="submit-btn" />
			</form>
		</Dialog>
	);
};

export default DialogAddRecord;



