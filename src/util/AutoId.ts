namespace util {
	/**
	 * 自动生成ID
	 */
	export class AutoId {
		public newId: number = 0;

		public constructor() {
		}

		public get id(): number {
			this.newId++;
			return this.newId;
		}
	}
}