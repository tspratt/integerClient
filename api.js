'use strict';
const serviceRequest = require('request');

let _report = '';

const getLabel = (int) => {
	let label = '';
	const even = (int % 2 === 0);
	const mod3 = (int %3 === 0);
	if (even) {
		if (mod3) {
			label = 'divisible by two and three';
		}
		else {label = 'even'}
	}
	else if (mod3) {
		label = 'divisible by three';
	}
	else {label = 'odd';}
	return label;
};

const localAlgorithm = (start = 0, end = 100, format = 'html') => {
	_report = '';
	for (let i = start; i <= end ; i++) {
		const label = "The number '" + i + "' is " + getLabel(i) + '.';
		if (format === 'html') {
			_report += label + '<br/>';
		}
		else {
			_report += label + '\n';
		}
	}
	return _report;
};

const getIntegers = (end, currentInt, callback) => {
	console.log('getIntegers',end, currentInt);
	if (currentInt < end) {
		getNextInt(currentInt)
		.then((oInt) => {
			_report += oInt.rptLine;
			getIntegers(end, oInt.nextInt, callback);
			}
		)
	}
	else {
		callback (null);
	}
};


const getNextInt = (currentInt) => {
	return new Promise((resolve, reject) => {
		let baseUri = '';
		if (currentInt % 2 === 0) {																	//even
			baseUri = 'http://localhost:3010';
		}
		else {
			baseUri = 'http://localhost:3020';
		}
		serviceRequest(baseUri + '?lastInt=' + currentInt, (err, res, body) => {
			if (err) {
				reject(err);
			}
			else {
				let oResponse = JSON.parse(body);
				const rptLine = oResponse.service + ": The number is '" + oResponse.nextInt + "'<br>";
				resolve({nextInt:oResponse.nextInt, rptLine:rptLine});
			}
		})
	});
};

const serviceAlgorithm = (start = '0', end = '100', format = 'html', callback) => {
	return new Promise((resolve, reject) => {
				_report = '';
				start = parseInt(start, 10);
				end = parseInt(end, 10);
				let currentInt = start;
				_report += "'Initial value: The number is '" + currentInt + "'<br>";
				getIntegers(end, currentInt, (err) => {
					resolve(_report);
				});
			}
	)
};



exports.localAlgorithm = localAlgorithm;
exports.serviceAlgorithm = serviceAlgorithm;