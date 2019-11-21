export const assetAnalysis = allocation => {
	const analysis = { 
		'stocks': null, 'eM': null, 'bonds': null, 'smallCap': null, 
		'other': null, 'US': null, 'foreign': null
	};

	analysis.stocks = allocation["Stocks"] ? `Stocks are extremely risky, especially if you don't know what you're doing. Don't put all your eggs in one basket - diversify instead !` : null;
	analysis.eM = allocation["Emerging Markets"] ? "Emerging Markets are risky for your portfolio. We recommend reallocating to broad market equity ETFs like IVV (US) or VEA (Foreign)." : null;
	analysis.bonds = allocation["Bonds"] ? "Bonds are way too conservative. They're for investors your parents' age. You're young! Take on more risk now to get higher returns." : null;
	analysis.smallCap = allocation["Small Cap"] ? "Small Cap is a risky asset class for your portfolio. We recommend reallocating to broad market equity ETFs like IVV (US) or VEA (Foreign)." : null;
	analysis.other = allocation["Other"] ? "We are unable to classify some of your assets, it is likely these investments are not appropriate for your retirement portfolio." : null;
	
	switch(true) {
	case allocation["US Equity"] < 55:
		analysis.US = "US Equity is the right asset class to invest in, but you're UNDER allocated. Let's remedy that - click on View Trade Recs for help.";
		break;
	case allocation["US Equity"] > 55:
		analysis.US = "US Equity is the right asset class to invest in, but you're OVER allocated. Let's remedy that - click on View Trade Recs for help.";
		break;
	default:
		analysis.US = "US Equity is missing from your portfolio. Let's remedy that - click on View Trade Recs for help.";
		break;
	}

	switch (true) {
	case allocation["Foreign Equity"] < 45:
		analysis.foreign = "Foreign Equity is the right asset class to invest in, but you're UNDER allocated. Let's remedy that - click on View Trade Recs for help.";
		break;
	case allocation["Foreign Equity"] > 45:
		analysis.foreign = "Foreign Equity is the right asset class to invest in, but you're OVER allocated. Let's remedy that - click on View Trade Recs for help.";
		break;
	default:
		analysis.foreign = "Foreign Equity is missing from your portfolio. Let's remedy that - click on View Trade Recs for help.";
		break;
	}

	return analysis;
};