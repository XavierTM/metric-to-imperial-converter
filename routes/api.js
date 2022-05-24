'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const converter = new ConvertHandler();


module.exports = function (app) {

	app.get('/api/convert', function(req, res) {
		
		try {

			const input = req.query.input;


			if (!input)
				return res.send('invalid unit');

			// get number and unit
			let invalidNumberError, invalidUnitError;
			let initNum, initUnit;

			try {
				initNum = converter.getNum(input);
			} catch (err) {
				invalidNumberError = err;
			}

			// if (invalidUnitError && invalidNumberError.doNotContinue)
			// 	return res.send('invalid number');

			try {
				initUnit = converter.getUnit(input);
			} catch (err) {
				invalidUnitError = err;
			}


			if (invalidUnitError && invalidNumberError) {
				return res.send("invalid number and unit");
			} else if (invalidNumberError) {
				return res.send("invalid number");
			} else if (invalidUnitError) {
				return res.send("invalid unit");
			}


			const returnUnit = converter.getReturnUnit(initUnit);
			const returnNum = converter.convert(initNum, initUnit);


			const returnString = converter.getString(initNum, initUnit, returnNum, returnUnit);

			// console.log(returnString);

			return res.send(returnString);


		} catch (err) {
			console.log(err);
			res.send(String(err));
		}
	})

};
