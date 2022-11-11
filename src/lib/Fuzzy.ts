// prettier-ignore
export default class FuzzySet {
	private ability = new Array<FuzzyLogic>();
	private loyalty = new Array<FuzzyLogic>();
	private classification = new Array<FuzzyLogic>();

	private matched_features;

	// method for initializing the fuzzy set
	public Initialize() {
		for (let i = 0; i < 5; i++) {
			this.ability[i] = new FuzzyLogic();
			this.loyalty[i] = new FuzzyLogic();
		}

		for (let i = 0; i < 2; i++) {
			this.classification[i] = new FuzzyLogic();
		}

		this.ability[0].Set('Worst', 0, 0, 1, 20, 1, 20, 1, 40, 0);
    this.ability[1].Set('Bad', 1, 20, 0, 40, 1, 40, 1, 60, 0);
    this.ability[2].Set('Average', 2, 40, 0, 60, 1, 60, 1, 80, 0);
    this.ability[3].Set('Good', 3, 60, 0, 80, 1, 80, 1, 100, 0);
    this.ability[4].Set('Excellent', 4, 80, 0, 100, 1, 100, 1, 100, 1);

    this.loyalty[0].Set('Worst', 0, 0, 1, 20, 1, 20, 1, 40, 0);
		this.loyalty[1].Set('Bad', 1, 20, 0, 40, 1, 40, 1, 60, 0);
		this.loyalty[2].Set('Average', 2, 40, 0, 60, 1, 60, 1, 80, 0);
		this.loyalty[3].Set('Good', 3, 60, 0, 80, 1, 80, 1, 100, 0);
		this.loyalty[4].Set('Excellent', 4, 80, 0, 100, 1, 100, 1, 100, 1);

		this.classification[0].Set('Not Eligible', 0, 0, 1, 40, 1, 40, 1, 70, 0);
		this.classification[1].Set('Eligible', 1, 60, 0, 80, 1, 80, 1, 100, 1);

		this.matched_features = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1],
			[0, 0, 0, 1, 1],
			[0, 0, 1, 1, 1],
			[0, 1, 1, 1, 1]
		];
	}

	// method for calculating the centroid of area
	public CalculateCentroid(ability: number, loyalty: number) {
		let area = 0,
			centroid = 0,
			numerator = 0,
			denominator = 0,
			minimum = 0,
			centerOfArea = 0;

		for (let i = 0; i < 5; i++)
			for (let j = 0; j < 5; j++) {
				minimum = Math.min(this.ability[i].GetMembership(ability),this.loyalty[j].GetMembership(loyalty));

				if (minimum > 0) {
					area = this.classification[this.matched_features[this.ability[i].GetIndex()][this.loyalty[j].GetIndex()]].GetArea(minimum);
					centroid = this.classification[this.matched_features[this.ability[i].GetIndex()][this.loyalty[j].GetIndex()]].GetCenterOfArea(minimum);
					numerator += area * centroid;
					denominator += area;
				}
			}

		centerOfArea = numerator / denominator;

		if (denominator == 0) return 0;
		else return centerOfArea;
	}

	// method for defuzzification
	public Defuzzify(ability: number, loyalty: number) {
		this.Initialize();

		let classification_COA = this.CalculateCentroid(ability, loyalty);

		let membershipArray = new Array<number>();
		for (let i = 0; i < 2; i++) {
			membershipArray.push(this.classification[i].GetMembership(classification_COA));
		}

		let maxMembership = Math.max(...membershipArray);
		let index = membershipArray.indexOf(maxMembership);
		let classification_linguistic = this.classification[index].GetLinguistic();

		return classification_linguistic;
	}
}

// prettier-ignore
class FuzzyLogic {
	private _name: string;
	private _ndex: number;
	private _n: number;
	private _x;
	private _y;

	constructor() {
		this._name = '';
		this._n = 0;
		this._x = new Array<number>();
		this._y = new Array<number>();
	}

	// method for setting up the fuzzy logic
	public Set(
		name: string,
		ndex: number,
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number
	) {
		this._name = name;
		this._ndex = ndex;

		let xx = new Array<number>();
		let yy = new Array<number>();

		xx.push(x0);
		yy.push(y0);
		this._n = 1;

		if (x1 != x0 || y1 != y0) {
			xx.push(x1);
			yy.push(y1);
			this._n++;
		}

		if (x2 != x1 || y2 != y1) {
			xx.push(x2);
			yy.push(y2);
			this._n++;
		}

		if (x3 != x2 || y3 != y2) {
			xx.push(x3);
			yy.push(y3);
			this._n++;
		}

		for (let i = 0; i < this._n; i++) {
			this._y.push(yy[i]);
			this._x.push(xx[i]);
		}
	}

	// method for calculating the membership function
	public GetMembership(pt: number) {
		let lo: number, mid: number, hi: number;
		let yy: number;

		if (this._n == 0) return 0;
		if (pt <= this._x[0]) return this._y[0];
		if (pt >= this._x[this._n - 1]) return this._y[this._n - 1];

		lo = 0;
		hi = this._n - 1;

		for (;;) {
			mid = Math.floor((lo + hi) / 2);
			if (mid == lo) break;
			if (this._x[mid] < pt) lo = mid;
			else hi = mid;
		}

		yy = (pt - this._x[hi - 1]) / (this._x[hi] - this._x[hi - 1]) * (this._y[hi] - this._y[hi - 1]);

		return yy + this._y[hi - 1];
	}

	// method for calculating the area under the curve
	public GetArea(mf: number) {
		if (this._n == 0) 
			return 0;
		else if (this._n == 2 && (this._y[0] == 0 || this._y[0] == 1)) 
			return 0.5 * mf * (this._x[1] - this._x[0]) * (2 - mf);
		else 
			return 0.5 * mf * (this._x[2] - this._x[0]) * (2 - mf);
	}

	// method for calculating the center of area
	public GetCenterOfArea(mf: number) {
		if (mf == 0) 
			return 0;
		if (this._n == 2 && this._x[0] == 0) 
			return ((1 - mf + mf * mf / 3) * this._x[1] / (2 - mf));
		else if (this._n == 2)
			return (mf * (this._x[0] + 2 / 3 * mf * (this._x[1] - this._x[0])) + 2 * (1 - mf) * (this._x[0] + 0.5 * (this._x[1] - this._x[0]) * (1 - mf))) / (2 - mf);
		else return this._x[1];
	}

	// method for getting the name of the fuzzy logic
	public GetLinguistic() {
		return this._name;
	}

	// method for getting the number of points
	public GetIndex() {
		return this._ndex;
	}
}
