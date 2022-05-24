const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;

const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

	test("#1. convertHandler should correctly read a whole number input.", function() {
		const num = convertHandler.getNum("1kg");
		assert.equal(num, 1);
	});


	test("#2. convertHandler should correctly read a decimal number input.", function() {
		const num = convertHandler.getNum("1.6kg");
		assert.equal(num, 1.6);
	});

	test("#3. convertHandler should correctly read a fractional input.", function() {
		const num = convertHandler.getNum("1/4kg");
		assert.equal(num, 0.25);
	});


	test("#4. convertHandler should correctly read a fractional input with a decimal", function() {
		const num = convertHandler.getNum("0.2/2kg");
		const num2 = convertHandler.getNum("1/0.5kg");
		assert.equal(num, 0.1);
		assert.equal(num2, 2);

	});

	test("#5. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function() {
		expect(() => convertHandler.getNum("3/2/3kg")).to.throw('invalid number');
	});

	test("#6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function() {
		const num = convertHandler.getNum("kg");
		assert.equal(num, 1);
	});


	test("#7. convertHandler should correctly read each valid input unit", function() {

		let unit = convertHandler.getUnit('1kg');
		assert.equal(unit, 'kg');

		unit = convertHandler.getUnit('1lbs');
		assert.equal(unit, 'lbs');
	
		unit = convertHandler.getUnit('1L');
		assert.equal(unit, 'L');
	
		unit = convertHandler.getUnit('1gal');
		assert.equal(unit, 'gal');
	
		unit = convertHandler.getUnit('1mi');
		assert.equal(unit, 'mi');
	
		unit = convertHandler.getUnit('1km');
		assert.equal(unit, 'km');
	
	});

	test("#8. convertHandler should correctly return an error for an invalid input unit", function() {
		expect(() => convertHandler.getUnit('1kig')).to.throw('invalid unit');
	});


	test("#9. convertHandler should return the correct return unit for each valid input unit.", function() {
		assert.equal(convertHandler.getReturnUnit('gal'), 'L');
		assert.equal(convertHandler.getReturnUnit('L'), 'gal');
		assert.equal(convertHandler.getReturnUnit('mi'), 'km');
		assert.equal(convertHandler.getReturnUnit('km'), 'mi');
		assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
		assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
	});


	test("#10. convertHandler should correctly return the spelled-out string unit for each valid input unit.", function() {
		assert.equal(convertHandler.spellOutUnit('L'), 'liters');
		assert.equal(convertHandler.spellOutUnit('l'), 'liters');
		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
		assert.equal(convertHandler.spellOutUnit('KG'), 'kilograms');
		assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
		assert.equal(convertHandler.spellOutUnit('GAL'), 'gallons');
		assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
		assert.equal(convertHandler.spellOutUnit('LBS'), 'pounds');
		assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
		assert.equal(convertHandler.spellOutUnit('MI'), 'miles');
		assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
		assert.equal(convertHandler.spellOutUnit('KM'), 'kilometers');

	});



	test('#11. convertHandler should correctly convert gal to L', function() {
		assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'should correctly convert gal to L');
	});

	test('#12. convertHandler should correctly convert L to gal', function() {
		assert.equal(convertHandler.convert(3.78541, 'L'), 1, 'should correctly convert L to gal');
	});


	test('#13. convertHandler should correctly convert mi to km', function() {
		assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'should correctly convert mi to km');
	});


	test('#14. convertHandler should correctly convert km to mi', function() {
		assert.equal(convertHandler.convert(1.60934, 'km'), 1, 'should correctly convert km to mi');
	});


	test('#15. convertHandler should correctly convert lbs to kg', function() {
		assert.equal(convertHandler.convert(1, 'lbs'), 0.453592, 'should correctly convert lbs to kg');	});


	test('#16. convertHandler should correctly convert kg to lbs', function() {
		assert.equal(convertHandler.convert(0.453592, 'kg'), 1, 'should correctly convert kg to lbs');
	});


});