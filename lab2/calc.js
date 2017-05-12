var keys = document.querySelectorAll('#calculator span'),
	operators = ['+', '-', '*', '÷', '%'],
	decimalFlag = false, bracketCouner = 0, sqrFlag = 0;

for (var i = 0; i < keys.length; i++) {

	keys[i].onclick = function (e) {
		var input = document.querySelector('.screen'),
			inputVal = input.innerHTML,
			btnVal = this.innerHTML;
		
		if (btnVal == 'C') {
			input.innerHTML = '';
			decimalFlag = false;
		}
		else if (btnVal == '=') {
			var equation = inputVal, lastChar = equation[equation.length - 1];
			
			equation = equation.replace(/÷/g, '/').replace(/sqrt/g, 'Math.sqrt').replace(/pow/g, 'Math.pow');

			if (equation.indexOf('%') > -1) {
				var res = percent(equation), leftStr = equation.slice(0, equation.indexOf(res.substr));
				equation = leftStr + res.num + res.num.toString()[res.num.toString().length - 1];
			}

			if (operators.indexOf(lastChar) > -1 || lastChar == '.') {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				input.innerHTML = eval(equation);
			}
			decimalFlag = false;
		}
		else if (operators.indexOf(btnVal) > -1) {
			var lastChar = inputVal[inputVal.length - 1];
			
			if (inputVal != '' && operators.indexOf(lastChar) == -1) {
				input.innerHTML += btnVal;
			}
			else if (inputVal == '' && btnVal == '-') {
				input.innerHTML += btnVal;
			}
			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			decimalFlag = false;
		}
		else if (btnVal == '.') {
			if (!decimalFlag) {
				input.innerHTML += btnVal;
				decimalFlag = true;
			}
		}
		else if (btnVal == 'sqrt' || btnVal == 'pow') {
			input.innerHTML += btnVal + '(';
			bracketCouner++;
			sqrFlag += (btnVal == 'pow') ? 1 : 0;
		}
		else if (btnVal == ',') {
			if (sqrFlag > 0) {
				input.innerHTML += btnVal;
				sqrFlag--;
			}
		}
		else if (btnVal == ')') {
			if (bracketCouner > 0) {
				input.innerHTML += btnVal;
				bracketCouner--;
			}
		}
		else {
			if (input.innerHTML[0] == '0' && btnVal == '0' && decimalFlag) {
				input.innerHTML += btnVal;
			}
			else if (input.innerHTML[0] == '0' && btnVal == '0' ) {
				return;
			}
			else {
				input.innerHTML += btnVal;
			}
		}
		e.preventDefault();
	}

}

/**
 * 
 * Returns an object with substring and percents from 100 value
 * @param str 
 * @returns object
 * 
 */
function percent(str) {
	var num = '', percentPos = str.indexOf('%'), leftNumPos = -1, rightNumPos = percentPos - 1;
	for (var i = rightNumPos; i >= 0 && (isFinite(str[i]) || str[i] == '.'); i--) {
		num += str[i];
		leftNumPos = i;
	}
	num = num.split('').reverse().join('');
	return {
		substr: num + '%',
		num: num / 100
	};
}