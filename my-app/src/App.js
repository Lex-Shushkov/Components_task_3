import React, { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState(''); 
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

	// Обработчик клика по цифре
	const handleNumClick = (num) => {
		if (isResult) {
			// Если уже есть результат, сбрасываем всё перед новым вводом
			setOperand1(num);
			setOperator('');
			setOperand2('');
			setIsResult(false);
		} else {
			if (!operator) {
				// Если оператор еще не был выбран, то обновляем operand1
				setOperand1(operand1 + num);
			} else {
				// Если оператор уже был выбран, обновляем operand2
				setOperand2(operand2 + num);
			}
		}
	};

	// Обработчик кликов по операторам (+ и -)
	const handleOperatorClick = (op) => {
		if (operand1 && !operand2) {
			if (isResult) {
				// если на табло результат
				setIsResult(false); // снимаем флаг результата (перестает зеленым)
				setOperator(op); // вводим оператор
			} else {
				setOperator(op);
			}
		}
	};

	// Обработчик клика по кнопке "=" для вычисления результата
	const calculateResult = () => {
		//высисляем если введены операнды и оператор, иначе вычислять нечего
		if (operand1 && operator && operand2) { 
			const num1 = Number(operand1);
			const num2 = Number(operand2);
			let result;

			if (operator === '+') {
				result = num1 + num2;
			} else if (operator === '-') {
				result = num1 - num2;
			}

			setOperand1(String(result)); // Результат будет сохранен в operand1
			setOperator(''); // Сбрасываем оператор
			setOperand2(''); // Очищаем второй операнд
			setIsResult(true); // Отмечаем, что результат показан
		}
	};

	// Обработчик сброса
	const resetCalculator = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setIsResult(false);
	};

	return (
		<div className={styles.calculator}>
			{/* Дисплей для вывода операции и результата */}
			<div
				className={styles.display}
				style={{ color: isResult ? 'green' : 'black' }}
			>
				{operand1}
				{operator}
				{operand2}
			</div>

			{/* Кнопки цифрами */}
			<div className={styles.buttons}>
				{NUMS.map((num) => (
					<button
						key={num}
						onClick={() => handleNumClick(num)}
						className={styles.button}
					>
						{num}
					</button>
				))}

				{/* Кнопки + и -*/}
				<button
					onClick={() => handleOperatorClick('+')}
					className={styles.button}
				>
					+
				</button>
				<button
					onClick={() => handleOperatorClick('-')}
					className={styles.button}
				>
					-
				</button>

				{/* Кнопка результата */}
				<button onClick={calculateResult} className={styles.button}>
					=
				</button>

				{/* Кнопка сброса */}
				<button onClick={resetCalculator} className={styles.button}>
					C
				</button>
			</div>
		</div>
	);
};
