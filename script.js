const walnut = document.getElementById("walnut");
const slider = document.getElementById("slider");
const resultBox = document.getElementById("result");
const goButton = document.getElementById("go-go-go");
const dataInput = document.getElementById("data-input");

if (slider && walnut) {
	slider.addEventListener("input", (event) => {
		const sliderValue = event.target.value;
		walnut.style.opacity = sliderValue;
	});
}

if (goButton) {
	goButton.addEventListener("click", cack);
}

async function cack() {
	if (!dataInput || !dataInput.value.trim()) {
		resultBox.innerHTML = "<p>Please enter tab-separated data.</p>";
		return;
	}

	resultBox.innerHTML = "<p>Calculating...</p>";

	try {
		const pyodide = await window.loadPyodide({
			indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
		});
		pyodide.globals.set("input_data", dataInput.value);
		const result = await pyodide.runPythonAsync(`
			INFINITY = 50000

			def product(nums):
				nums = [str(round(x, 10)) for x in nums if x != 1]
				return "=" + "*".join(nums)


			def parsely(string):
				# --------------------------------
				# MANUAL
				# --------------------------------

				eragon = {
					"WATERS": {
						"N/A": 0,
						"Miniscule": 1,
						"Minor": 2,
						"Min-Med": 3,
						"Medium": 4,
						"Med-Major": 5,
						"Major": 6,
					},
					"TOPOGRAPHIES": {
						"Superflat": 0,
						"Flat": 1,
						"Flat-ish": 2,
						"Bumpy": 3,
						"Small Hills": 4,
						"Medium Hills": 5,
						"Big Hills": 6,
						"Extreme Hills": 7,
						"Small Mountains": 8,
						"Medium Mountains": 9,
						"Big Mountains": 10,
					}
				}

				points_manual = {
					"BASE": {
						"11": 50,
						"10.5": 35,
						"10": 20,
						"9.5": 15,
						"9": 10,
						"8.5": 7.5,
						"8": 5,
						"7.5": 3.5,
						"7": 2,
						"6.5": 1.5,
						"6": 1,
						"5.5": 0.75,
						"5": 0.5,
						"4.5": 0.35,
						"4": 0.2,
						"3.5": 0.15,
						"3": 0.1,
						"2.5": 0.075,
						"2": 0.05,
						"1.5": 0.035,
						"1": 0.02,
						"0.5": 0.015,
						"0": 0.01,
					},
					"DEVELOPMENT": {
						"Desolate": 0.55,
						"Rural": 0.7,
						"Suburban": 0.85,
						"Urban Tiny": 1,
						"Urban Small": 1.15,
						"Urban Small-ish": 1.3,
						"Urban Medium": 1.45,
						"Urban Large-ish": 1.6,
						"Urban Large": 1.75,
						"Urban Huge": 1.9,
					},
					"ROADS_MAJOR": {
						(0,): 0.75,
						(1,): 0.8125,
						(2,): 0.875,
						(3,): 0.9375,
						(4, 5): 1,
						(6, 7): 1.1,
						(8, 9): 1.2,
						range(10, 13): 1.3,
						range(13, 16): 1.4,
						range(16, 21): 1.5,
						range(21, 31): 1.6,
						range(31, 41): 1.7,
						range(41, INFINITY): 1.8,
					},
					"ROADS_MEDIUM": {
						(0,): 0.6,
						(1,): 0.7,
						(2,): 0.8,
						(3,): 0.9,
						(4, 5): 1,
						(6, 7): 1.1,
						range(8, 11): 1.2,
						range(11, 16): 1.3,
						range(16, 21): 1.4,
						range(21, 31): 1.5,
						range(31, 41): 1.6,
						range(41, 61): 1.7,
						range(61, 81): 1.8,
						range(80, 121): 1.9,
						range(121, 161): 2,
						range(161, 241): 2.1,
						range(241, INFINITY): 2.2,
					},
					"TERRAIN": {
						"Tundra": 0.7,
						"Rock": 0.8,
						"Plains": 0.9,
						"Cropland": 1,
						"Forest": 1.1,
						"Deep Forest": 1.2,
						"Urban": 1.3,
					},
					"WATER": {
						0: 0.6,
						1: 0.7,
						2: 0.8,
						3: 0.9,
						4: 1,
						5: 1.1,
						6: 1.2,
						7: 1.3,
						8: 1.4,
						9: 1.5,
						10: 1.6,
						11: 1.7,
						12: 1.8
					},
					"TOPOGRAPHY": {
						0: 1.2,
						1: 1.15,
						2: 1.1,
						3: 1.05,
						4: 1,
						5: 0.95,
						6: 0.9,
						7: 0.85,
						8: 0.8,
						9: 0.75,
						10: 0.7,
						11: 0.65,
						12: 0.6,
						13: 0.55,
						14: 0.5,
						15: 0.45,
						16: 0.4,
						17: 0.35,
						18: 0.3,
						19: 0.25,
						20: 0.2
					},
					"CLIMATE": {
						"Af": 0.85,
						"Am": 0.9,
						"Aw": 0.95,
						"Bwh": 0.8,
						"Bwk": 0.8,
						"Bsh": 0.9,
						"Bsk": 0.9,
						"Csa": 0.95,
						"Csb": 1.05,
						"Csc": 1.15,
						"Cwa": 1.05,
						"Cwb": 1.1,
						"Cwc": 1.05,
						"Cfa": 1.15,
						"Cfb": 1.05,
						"Cfc": 0.95,
						"Dsa": 1,
						"Dsb": 0.9,
						"Dsc": 0.8,
						"Dsd": 0.75,
						"Dwa": 1.05,
						"Dwb": 0.95,
						"Dwc": 0.85,
						"Dwd": 0.8,
						"Dfa": 1.1,
						"Dfb": 1,
						"Dfc": 0.9,
						"Dfd": 0.85,
						"Et": 0.8,
						"Ef": 0.6,
					}
				}
				health_manual = {
					"BASE": {
						"11": 125,
						"10.5": 117.5,
						"10": 100,
						"9.5": 96.25,
						"9": 87.5,
						"8.5": 83.75,
						"8": 75,
						"7.5": 71.25,
						"7": 62.5,
						"6.5": 58.75,
						"6": 50,
						"5.5": 48.125,
						"5": 43.75,
						"4.5": 41.875,
						"4": 37.5,
						"3.5": 35.625,
						"3": 31.25,
						"2.5": 29.375,
						"2": 25,
						"1.5": 24.0625,
						"1": 21.875,
						"0.5": 20.9375,
						"0": 18.75,
					},
					"DEVELOPMENT": {
						"Desolate": 0.4,
						"Rural": 0.6,
						"Suburban": 0.8,
						"Urban Tiny": 1,
						"Urban Small": 1.2,
						"Urban Small-ish": 1.4,
						"Urban Medium": 1.6,
						"Urban Large-ish": 1.8,
						"Urban Large": 2,
						"Urban Huge": 2.2
					},
					"ROADS_MEDIUM": {
						(0,): 0.5,
						(1,): 0.625,
						(2,): 0.75,
						(3,): 0.875,
						(4, 5): 1,
						(6, 7): 1.125,
						range(8, 11): 1.25,
						range(11, 16): 1.375,
						range(16, 21): 1.5,
						range(21, 31): 1.625,
						range(31, 41): 1.75,
						range(41, 61): 1.875,
						range(61, 81): 2,
						range(81, 121): 2.125,
						range(121, 161): 2.25,
						range(161, 241): 2.375,
						range(241, INFINITY): 2.5,
					},
					"WATER": {
						0: 0.6,
						1: 0.7,
						2: 0.8,
						3: 0.9,
						4: 1,
						5: 1.1,
						6: 1.2,
						7: 1.3,
						8: 1.4,
						9: 1.5,
						10: 1.6,
						11: 1.7,
						12: 1.8,
					},
					"LAKE": {
						"N/A": 0.7,
						"Miniscule Lake": 0.8,
						"Minor Lake": 0.9,
						"Min-Med Lake": 1,
						"Medium Lake": 1.1,
						"Med-Major Lake": 1.2,
						"Major Lake": 1.3,
					},
					"TERRAIN": {
						"Tundra": 0.7,
						"Rock": 0.8,
						"Plains": 0.9,
						"Cropland": 1,
						"Forest": 1.1,
						"Deep Forest": 1.2,
						"Urban": 1.3,
					},
					"INNER": {
						"Superflat": 1.15,
						"Flat": 1.075,
						"Flat-ish": 1,
						"Bumpy": 0.925,
						"Small Hills": 0.85,
						"Medium Hills": 0.775,
						"Big Hills": 0.7,
						"Extreme Hills": 0.625,
						"Small Montains": 0.55,
						"Medium Mountains": 0.475,
						"Big Mountains": 0.4
					},
					"CLIMATE": {
						"Af": 0.85,
						"Am": 0.9,
						"Aw": 0.95,
						"Bwh": 0.8,
						"Bwk": 0.8,
						"Bsh": 0.9,
						"Bsk": 0.9,
						"Csa": 0.95,
						"Csb": 1.05,
						"Csc": 1.15,
						"Cwa": 1.05,
						"Cfa": 1.15,
						"Cfb": 1.05,
						"Cfc": 0.95,
						"Dsa": 1,
						"Dsb": 0.9,
						"Dsc": 0.8,
						"Dsd": 0.75,
						"Dwa": 1.05,
						"Dwb": 0.95,
						"Dwc": 0.85,
						"Dwd": 0.8,
						"Dfa": 1.1,
						"Dfb": 1,
						"Dfc": 0.9,
						"Dfd": 0.85,
						"Et": 0.8,
						"Ef": 0.6
					}
				}
				attack_manual = {
					"BASE": {
						"11": 20,
						"10.5": 18.8,
						"10": 16,
						"9.5": 15.4,
						"9": 14,
						"8.5": 13.4,
						"8": 12,
						"7.5": 11.4,
						"7": 10,
						"6.5": 9.4,
						"6": 8,
						"5.5": 7.7,
						"5": 7,
						"4.5": 6.7,
						"4": 6,
						"3.5": 5.7,
						"3": 5,
						"2.5": 4.7,
						"2": 4,
						"1.5": 3.85,
						"1": 3.5,
						"0.5": 3.25,
						"0": 3
					},
					"DEVELOPMENT": {
						"Desolate": 0.7,
						"Rural": 0.8,
						"Suburban": 0.9,
						"Urban Tiny": 1,
						"Urban Small": 1.1,
						"Urban Small-ish": 1.2,
						"Urban Medium": 1.3,
						"Urban Large-ish": 1.4,
						"Urban Large": 1.5,
						"Urban Huge": 1.6,
					},
					"ROADS_MAJOR": {
						(0,): 0.4,
						(1,): 0.55,
						(2,): 0.7,
						(3,): 0.85,
						(4, 5): 1,
						(6, 7): 1.2,
						(8, 9): 1.4,
						range(10, 13): 1.6,
						range(13, 16): 1.8,
						range(16, 21): 2,
						range(21, 31): 2.2,
						range(31, 41): 2.4,
						range(41, INFINITY): 2.6,
					},
					"ROADS_MEDIUM": {
						(0,): 0.8,
						(1,): 0.85,
						(2,): 0.9,
						(3,): 0.95,
						(4, 5): 1,
						(6, 7): 1.05,
						range(8, 11): 1.1,
						range(11, 16): 1.15,
						range(16, 21): 1.2,
						range(21, 31): 1.25,
						range(31, 41): 1.3,
						range(41, 61): 1.35,
						range(61, 81): 1.4,
						range(81, 121): 1.45,
						range(121, 161): 1.5,
						range(161, 241): 1.55,
						range(241, INFINITY): 1.6,
					},
					"TERRAIN": {
						"Tundra": 0.55,
						"Rock": 0.7,
						"Plains": 0.85,
						"Cropland": 1,
						"Forest": 1.15,
						"Deep Forest": 1.3,
						"Urban": 1.45
					},
					"TOPOGRAPHY": {
						0: 1.4,
						1: 1.3,
						2: 1.2,
						3: 1.1,
						4: 1,
						5: 0.95,
						6: 0.9,
						7: 0.85,
						8: 0.8,
						9: 0.75,
						10: 0.7,
						11: 0.65,
						12: 0.6,
						13: 0.55,
						14: 0.5,
						15: 0.45,
						16: 0.4,
						17: 0.35,
						18: 0.3,
						19: 0.25,
						20: 0.2
					},
					"CLIMATE": {
						"Af": 0.7,
						"Am": 0.8,
						"Aw": 0.9,
						"Bwh": 0.6,
						"Bwk": 0.6,
						"Bsh": 0.8,
						"Bsk": 0.8,
						"Csa": 0.9,
						"Csb": 1.1,
						"Csc": 1.3,
						"Cwa": 1.1,
						"Cwb": 1.2,
						"Cwc": 1.1,
						"Cfa": 1.3,
						"Cfb": 1.4,
						"Cfc": 0.9,
						"Dsa": 1,
						"Dsb": 0.8,
						"Dsc": 0.6,
						"Dsd": 0.5,
						"Dwa": 1.1,
						"Dwb": 0.9,
						"Dwc": 0.7,
						"Dwd": 0.6,
						"Dfa": 1.2,
						"Dfb": 1,
						"Dfc": 0.8,
						"Dfd": 0.7,
						"Et": 0.6,
						"Ef": 0.2,
					},
				}
				defense_manual = {
					"BASE": {
						"11": 0.0825,
						"10.5": 0.07875,
						"10": 0.075,
						"9.5": 0.07125,
						"9": 0.0675,
						"8.5": 0.06375,
						"8": 0.06,
						"7.5": 0.05625,
						"7": 0.0525,
						"6.5": 0.04875,
						"6": 0.045,
						"5.5": 0.04125,
						"5": 0.0375,
						"4.5": 0.03375,
						"4": 0.03,
						"3.5": 0.02625,
						"3": 0.0225,
						"2.5": 0.01875,
						"2": 0.015,
						"1.5": 0.01125,
						"1": 0.0075,
						"0.5": 0.00375,
						"0": 0,
					},
					"DEVELOPMENT": {
						"Desolate": 0.625,
						"Rural": 0.75,
						"Suburban": 0.875,
						"Urban Tiny": 1,
						"Urban Small": 1.125,
						"Urban Small-ish": 1.25,
						"Urban Medium": 1.375,
						"Urban Large-ish": 1.5,
						"Urban Large": 1.625,
						"Urban Huge": 1.75
					},
					"ROADS_MAJOR": {
						(0,): 1.4,
						(1,): 1.3,
						(2,): 1.2,
						(3,): 1.1,
						(4, 5): 1,
						(6, 7): 0.95,
						(8, 9): 0.9,
						range(10, 13): 0.85,
						range(13, 16): 0.8,
						range(16, 21): 0.75,
						range(21, 31): 0.7,
						range(31, 41): 0.65,
						range(41, INFINITY): 0.6,
					},
					"ROADS_MEDIUM": {
						(0,): 0.6,
						(1,): 0.7,
						(2,): 0.8,
						(3,): 0.9,
						(4, 5): 1,
						(6, 7): 1.1,
						range(8, 11): 1.2,
						range(11, 16): 1.3,
						range(16, 21): 1.4,
						range(21, 31): 1.5,
						range(31, 41): 1.6,
						range(41, 61): 1.7,
						range(61, 81): 1.8,
						range(81, 121): 1.9,
						range(121, 161): 2,
						range(161, 241): 2.1,
						range(241, INFINITY): 2.2,
					},
					"INNER": {
						"Superflat": 0.9,
						"Flat": 0.95,
						"Flat-ish": 1,
						"Bumpy": 1.1,
						"Small Hills": 1.2,
						"Medium Hills": 1.3,
						"Big Hills": 1.4,
						"Extreme Hills": 1.5,
						"Small Mountains": 1.6,
						"Medium Mountains": 1.7,
						"Big Mountains": 1.8,
					},
					"OUTER": {
						"Superflat": 0.75,
						"Flat": 0.875,
						"Flat-ish": 1,
						"Bumpy": 1.25,
						"Small Hills": 1.5,
						"Medium Hills": 1.75,
						"Big Hills": 2,
						"Extreme Hills": 2.25,
						"Small Mountains": 2.5,
						"Medium Mountains": 2.75,
						"Big Mountains": 3,
					},
					"TERRAIN": {
						"Tundra": 0.625,
						"Rock": 0.75,
						"Plains": 0.875,
						"Cropland": 1,
						"Forest": 1.125,
						"Deep Forest": 1.25,
						"Urban": 1.375,
					},
					"WATER": {
						0: 0.5,
						1: 0.625,
						2: 0.75,
						3: 0.875,
						4: 1,
						5: 1.125,
						6: 1.25,
						7: 1.375,
						8: 1.5,
						9: 1.625,
						10: 1.75,
						11: 1.875,
						12: 2,
					},
					"CLIMATE": {
						"Af": 1.15,
						"Am": 1.1,
						"Aw": 1.05,
						"Bwh": 1.2,
						"Bwk": 1.2,
						"Bsh": 1.1,
						"Bsk": 1.1,
						"Csa": 1.05,
						"Csb": 0.95,
						"Csc": 0.85,
						"Cwa": 0.95,
						"Cwb": 0.9,
						"Cwc": 0.95,
						"Cfa": 0.85,
						"Cfb": 0.95,
						"Cfc": 1.05,
						"Dsa": 1,
						"Dsb": 1.1,
						"Dsc": 1.2,
						"Dsd": 1.25,
						"Dwa": 0.95,
						"Dwb": 1.05,
						"Dwc": 1.15,
						"Dwd": 1.2,
						"Dfa": 0.9,
						"Dfb": 1,
						"Dfc": 1.1,
						"Dfd": 1.15,
						"Et": 1.2,
						"Ef": 1.4
					}
				}
				regen_manual = {
					"BASE": {
						"11": 0.055,
						"10.5": 0.0525,
						"10": 0.05,
						"9.5": 0.0475,
						"9": 0.045,
						"8.5": 0.0425,
						"8": 0.04,
						"7.5": 0.0375,
						"7": 0.035,
						"6.5": 0.0325,
						"6": 0.03,
						"5.5": 0.0275,
						"5": 0.025,
						"4.5": 0.0225,
						"4": 0.02,
						"3.5": 0.0175,
						"3": 0.015,
						"2.5": 0.0125,
						"2": 0.01,
						"1.5": 0.0075,
						"1": 0.005,
						"0.5": 0.0025,
						"0": 0,
					},
					"ROADS_MAJOR": {
						(0,): 0.4,
						(1,): 0.55,
						(2,): 0.7,
						(3,): 0.85,
						(4, 5): 1,
						(6, 7): 1.2,
						(8, 9): 1.4,
						range(10, 13): 1.6,
						range(13, 16): 1.8,
						range(16, 21): 2,
						range(21, 31): 2.2,
						range(31, 41): 2.4,
						range(41, INFINITY): 2.6,
					},
					"ROADS_MEDIUM": {
						(0,): 0.5,
						(1,): 0.625,
						(2,): 0.75,
						(3,): 0.875,
						(4, 5): 1,
						(6, 7): 1.125,
						range(8, 11): 1.25,
						range(11, 16): 1.375,
						range(16, 21): 1.5,
						range(21, 31): 1.625,
						range(31, 41): 1.75,
						range(41, 61): 1.875,
						range(61, 81): 2,
						range(81, 121): 2.125,
						range(121, 161): 2.25,
						range(161, 241): 2.375,
						range(241, INFINITY): 2.5,
					},
					"WATER": {
						0: 0.4,
						1: 0.55,
						2: 0.7,
						3: 0.85,
						4: 1,
						5: 1.15,
						6: 1.3,
						7: 1.45,
						8: 1.6,
						9: 1.75,
						10: 1.9,
						11: 2.05,
						12: 2.2,
					},
					"TOPOGRAPHY": {
						0: 1.4,
						1: 1.3,
						2: 1.2,
						3: 1.1,
						4: 1,
						5: 0.95,
						6: 0.9,
						7: 0.85,
						8: 0.8,
						9: 0.75,
						10: 0.7,
						11: 0.65,
						12: 0.6,
						13: 0.55,
						14: 0.5,
						15: 0.45,
						16: 0.4,
						17: 0.35,
						18: 0.3,
						19: 0.25,
						20: 0.2,
					},
					"CLIMATE": {
						"Af": 0.85,
						"Am": 0.9,
						"Aw": 0.95,
						"Bwh": 0.8,
						"Bwk": 0.8,
						"Bsh": 0.9,
						"Bsk": 0.9,
						"Csa": 0.95,
						"Csb": 1.05,
						"Csc": 1.15,
						"Cwa": 1.05,
						"Cwb": 1.1,
						"Cwc": 1.05,
						"Cfa": 1.15,
						"Cfb": 1.05,
						"Cfc": 0.95,
						"Dsa": 1,
						"Dsb": 0.9,
						"Dsc": 0.8,
						"Dsd": 0.75,
						"Dwa": 1.05,
						"Dwb": 0.95,
						"Dwc": 0.85,
						"Dwd": 0.8,
						"Dfa": 1.1,
						"Dfb": 1,
						"Dfc": 0.9,
						"Dfd": 0.85,
						"Et": 0.8,
						"Ef": 0.6,
					}
				}

				# --------------------------------

				elements = string.split("\t")

				level = elements[4]
				scale = elements[5]
				river = elements[6]
				lake = elements[7]
				major_roads = int(elements[8])
				medium_roads = int(elements[9])
				development = elements[10]
				terrain = elements[11]
				climate = elements[12]
				inner_topography = elements[13]
				outer_topography = elements[14]

				def lookup_value(mapping, raw_value):
					if raw_value is None:
						return None

					value = str(raw_value).strip()
					if value == "":
						return None

					if value in mapping:
						return value

					for key in mapping:
						if str(key).lower().replace(" ", "") == value.lower().replace(" ", ""):
							return key

					try:
						number = int(float(value))
					except ValueError:
						number = None

					if number is not None:
						keys = list(mapping.keys())
						if 0 <= number < len(keys):
							return keys[number]
						if number in mapping:
							return number

					return value

				river_key = lookup_value(eragon["WATERS"], river.split()[0])
				lake_key = lookup_value(eragon["WATERS"], lake.split()[0])
				inner_topography_key = lookup_value(eragon["TOPOGRAPHIES"], inner_topography)
				outer_topography_key = lookup_value(eragon["TOPOGRAPHIES"], outer_topography)
				development_key = lookup_value(points_manual["DEVELOPMENT"], development)
				terrain_key = lookup_value(points_manual["TERRAIN"], terrain)
				climate_key = lookup_value(points_manual["CLIMATE"], climate)
				inner_key = lookup_value(health_manual["INNER"], inner_topography)
				outer_key = lookup_value(defense_manual["OUTER"], outer_topography)

				topography = eragon["TOPOGRAPHIES"][inner_topography_key] + eragon["TOPOGRAPHIES"][outer_topography_key]
				water = eragon["WATERS"][river_key] + eragon["WATERS"][lake_key]

				points_mults = [
					points_manual["BASE"][level],
					points_manual["WATER"][water] *
					next(value for key, value in points_manual["ROADS_MAJOR"].items() if major_roads in key) *
					next(value for key, value in points_manual["ROADS_MEDIUM"].items() if medium_roads in key) *
					points_manual["DEVELOPMENT"][development_key] *
					points_manual["TOPOGRAPHY"][topography] *
					points_manual["CLIMATE"][climate_key] *
					points_manual["TERRAIN"][terrain_key] *
					(1.1 if scale == "Cap" else 1)
				]
				health_mults = [
					health_manual["BASE"][level],
					health_manual["WATER"][water] *
					next(value for key, value in health_manual["ROADS_MEDIUM"].items() if medium_roads in key) *
					health_manual["DEVELOPMENT"][development_key] *
					health_manual["INNER"][inner_key] *
					health_manual["CLIMATE"][climate_key] *
					health_manual["TERRAIN"][terrain_key] *
					(1.1 if scale == "Cap" else 1)
				]
				attack_mults = [
					attack_manual["BASE"][level],
					next(value for key, value in attack_manual["ROADS_MAJOR"].items() if major_roads in key) *
					next(value for key, value in attack_manual["ROADS_MEDIUM"].items() if medium_roads in key) *
					attack_manual["DEVELOPMENT"][development_key] *
					attack_manual["TOPOGRAPHY"][topography] *
					attack_manual["CLIMATE"][climate_key] *
					attack_manual["TERRAIN"][terrain_key] *
					(1.1 if scale == "Cap" else 1)
				]
				defense_mults = [
					defense_manual["BASE"][level],
					defense_manual["WATER"][water] *
					next(value for key, value in defense_manual["ROADS_MAJOR"].items() if major_roads in key) *
					next(value for key, value in defense_manual["ROADS_MEDIUM"].items() if medium_roads in key) *
					defense_manual["DEVELOPMENT"][development_key] *
					defense_manual["TERRAIN"][terrain_key] *
					defense_manual["INNER"][inner_key] *
					defense_manual["OUTER"][outer_key] *
					defense_manual["CLIMATE"][climate_key] *
					(1.1 if scale == "Cap" else 1)
				]
				regen_mults = [
					regen_manual["BASE"][level],
					next(value for key, value in regen_manual["ROADS_MAJOR"].items() if major_roads in key) *
					next(value for key, value in regen_manual["ROADS_MEDIUM"].items() if medium_roads in key) *
					regen_manual["WATER"][water] *
					regen_manual["TOPOGRAPHY"][topography] *
					regen_manual["CLIMATE"][climate_key] *
					(1.1 if scale == "Cap" else 1)
				]

				final_answer = "\t".join([
					product(points_mults),
					product(health_mults),
					product(attack_mults),
					product(defense_mults),
					product(regen_mults),
				])

				return final_answer

			parsely(input_data)
		`);

		// Now turn the result into a table
		const tableBody = [];
		const cells = result.split("\t");
		cells.forEach((element) => {
			tableBody.push(`<td>${element}</td>`);
		});

		resultBox.innerHTML = `<table class="result-table"+><tr>${tableBody.join("")}</tr></table>`;
	} catch (error) {
		console.error(error);
		resultBox.innerHTML = `<p>Warning: This is the error.</p><pre>${(error && error.message) || String(error)}</pre>`;
	}
}
