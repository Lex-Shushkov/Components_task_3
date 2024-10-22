import React, { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [calc, setCalc] = useState({
		operand1: '',
		operand2: '',
		operator: '',
		isResult: false,
	});

	const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

	// Обработчик клика по цифре
	const handleNumClick = (num) => {
		if (calc.isResult) {
			// Если уже есть результат, сбрасываем всё перед новым вводом
			setCalc({
				operand1: num,
				operator: '',
				operand2: '',
				isResult: false,
			});
		} else {
			if (!calc.operator) {
				// Если оператор еще не был выбран, то обновляем operand1
				setCalc((prevState)=>({
					...prevState,
					operand1: prevState.operand1 + num,
				}))
				
			} else {
				// Если оператор уже был выбран, обновляем operand2
				setCalc((prevState)=>({
					...prevState,
					operand2: prevState.operand2 + num,
				}))
			}
		}
	};

	// Обработчик кликов по операторам (+ и -)
	const handleOperatorClick = (op) => {
		if (calc.operand1 && !calc.operand2) {
			if (calc.isResult) {
				// если на табло результат
				setCalc((prevState)=>({
					...prevState,
					isResult: false, // снимаем флаг результата (перестает зеленым)
					operator: op, // вводим оператор
				}))
				
			} else {
				setCalc((prevState)=>({
					...prevState,
					operator: op,
				}))
				
			}
		}
	};

	// Обработчик клика по кнопке "=" для вычисления результата
	const calculateResult = () => {
		//высисляем если введены операнды и оператор, иначе вычислять нечего
		if (calc.operand1 && calc.operator && calc.operand2) {
			const num1 = Number(calc.operand1);
			const num2 = Number(calc.operand2);
			let result;

			if (calc.operator === '+') {
				result = num1 + num2;
			} else if (calc.operator === '-') {
				result = num1 - num2;
			}

			setCalc({
				operand1: String(result), // Результат будет сохранен в operand1
				operator: '', // Сбрасываем оператор
				operand2: '', // Очищаем второй операнд
				isResult: true, // Отмечаем, что результат показан
			})
			
		}
	};

	// Обработчик сброса
	const resetCalculator = () => {
		setCalc({
			operand1: '',
			operator: '',
			operand2: '',
			isResult: false,
		})
		
	};

	return (
		<div className={styles.calculator}>
			{/* Дисплей для вывода операции и результата */}
			<div
				className={styles.display}
				style={{ color: calc.isResult ? 'green' : 'black' }}
			>
				{calc.operand1}
				{calc.operator}
				{calc.operand2}
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
