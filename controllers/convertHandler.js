

const unitList = new Set([
	'gal',
	'l',
	'mi',
	'km',
	'kg',
	'lbs',
]);


const spellingMap = new Map;

spellingMap.set('gal', 'gallons');
spellingMap.set('l', 'liters');
spellingMap.set('mi', 'miles');
spellingMap.set('km', 'kilometers');
spellingMap.set('kg', 'kilograms');
spellingMap.set('lbs', 'pounds');


const returnUnitMap = new Map;

returnUnitMap.set('gal', 'L');
returnUnitMap.set('l', 'gal');
returnUnitMap.set('mi', 'km');
returnUnitMap.set('km', 'mi');
returnUnitMap.set('kg', 'lbs');
returnUnitMap.set('lbs', 'kg');


const galToL = 3.78541;
const lToGal = 1 / galToL;
const lbsToKg = 0.453592;
const kgToLbs = 1 / lbsToKg;
const miToKm = 1.60934;
const kmToMi = 1 / miToKm;

const convertMap = new Map;

convertMap.set('galtol', galToL);
convertMap.set('ltogal', lToGal);
convertMap.set('mitokm', miToKm);
convertMap.set('kmtomi', kmToMi);
convertMap.set('kgtolbs', kgToLbs);
convertMap.set('lbstokg', lbsToKg);




function getUnitStartIndex(str) {

	let index = -1;

	// while (str[index] == '.' || str[index] == '/'  || (str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57)) {
	// 	index++;
	// }


	for (let i = 0; i < str.length; i++) {

		if (str[i] == '.' || str[i] == '/'  || (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57))
			index = i;
	}

	return index + 1;
}

function formatUnit(unit) {

	unit = String(unit);

	if (unit.toLowerCase() == 'l')
		return 'L';

	return unit.toLowerCase();
}



function ConvertHandler() {
	
	this.getNum = function(input) {

		input = String(input);


		if (input[0] === ' ')
			throw new Error('invalid number');


		// don't allow double fractions
		const numberOfFractions = (input.match(/\//g) || []).length;
		if (numberOfFractions > 1)
			throw new Error('invalid number');
		
		const unitStartIndex = getUnitStartIndex(input);
		const str = input.substring(0, unitStartIndex);

		if (unitStartIndex === 0) {
			
			if (unitList.has(input.toLowerCase())) {
				return 1;
			} else {
				const err = new Error('invalid number');
				// err.doNotContinue = true;
				throw err;
			}
		}

		try {
			return eval(str);
		} catch (err) {
			throw new Error('invalid number');
		}
		
	};
	
	this.getUnit = function(input) {
		
		const unitStartIndex = getUnitStartIndex(input);
		const unit = input.substring(unitStartIndex);

		// console.log({ unit, unitStartIndex });

		if (!unitList.has(unit.toLowerCase()))
			throw new Error('invalid unit');

		return unit;

	};
	
	this.getReturnUnit = function(initUnit) {
		const unit = initUnit.toLowerCase();
		return returnUnitMap.get(unit);
	};

	this.spellOutUnit = function(unit) {
		unit = unit.toLowerCase();
		return spellingMap.get(unit);
	};
	
	this.convert = function(initNum, initUnit) {
		
		const returnUnit = this.getReturnUnit(initUnit);
		const str = `${initUnit}to${returnUnit}`.toLowerCase();
		const multiplier = convertMap.get(str);

		return multiplier * initNum;    
	};
	
	this.getString = function(initNum, initUnit, returnNum, returnUnit) {

		const spelledOutInitUnit = this.spellOutUnit(initUnit);
		const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

		returnNum = parseFloat(returnNum.toFixed(5))

		const result = {
			 "initNum": initNum,
			 "initUnit": formatUnit(initUnit),
			 "returnNum": returnNum,
			 "returnUnit": formatUnit(returnUnit),
			 "string": `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`
		 }

		// console.log(result)
		// console.log("=====================================================================")
		
		return result;
	};
	
}

module.exports = ConvertHandler;
