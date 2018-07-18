const TEMPLATE = 'best-practices-template.pptx';
const OUTPUT = 'output.pptx';

var PPT_Template = require('ppt-template');
var Presentation = PPT_Template.Presentation;
var Slide = PPT_Template.Slide;

// Presentation Object
var myPresentation = new Presentation();

console.log('# Load test.pptx as template, then build output.pptx with custom content.');

// Load example.pptx
myPresentation.loadFile(TEMPLATE)

	.then(() => {
		console.log('- Read Presentation File Successfully!');
	})

	.then(() => {

		// get slide conut
		var slideCount = myPresentation.getSlideCount();
		console.log('- Slides Count is ', slideCount);

		// Get and clone slide. (Watch out index...)
		let cloneSlide1 = myPresentation.getSlide(3).clone();

		// Fill all content
		cloneSlide1.fillAll([
			Slide.pair('[Title]', 'Use Async-Await or promises for async error handling2'),
			Slide.pair('[TLDR]', 'Handling async errors in callback style is probably the fastest way to hell (a.k.a the pyramid of doom). The best gift you can give to your code is using a reputable promise library or async-await instead which enables a much more compact and familiar code syntax like try-catch'),
		]);

		// Fill content
		//cloneSlide3.fill(Slide.pair('[Content1]', 'fill() 1'));

		// Generate new presention by silde array.
		var newSlides = [cloneSlide1];
		return myPresentation.generate(newSlides);
	})

	.then((newPresentation) => {
		console.log('- Generate Presentation Successfully');
		return newPresentation;
	})

	.then((newPresentation) => {
		// Output .pptx file
		return newPresentation.saveAs(OUTPUT);
	})

	.then(() => {
		console.log('- Save Successfully');
	})

	.catch((err) => {
		console.error(err);
	});
