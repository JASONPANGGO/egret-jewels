namespace data {
	/**
	 * 顶层页面数据
	 */
	export class FirstData {
		public horizontal: { x: number, y: number }; //横屏位置
		public vertical: { x: number, y: number }; //竖屏位置

		public topSpace: number; //上间距
		public rightSpace: number; //右间距
		public bottomSpace: number; //下间距
		public leftSpace: number; //左间距

		public horRatio: number; //横屏占比(%) (有赋值时使用占比适配)
		public verRatio: number; //竖屏占比(%) (有赋值时使用占比适配)
		public horSpace: number; //logo与btn横屏间距
		public verSpace: number; //logo与btn竖屏间距

		public center: boolean; //中间布局
		public centerOffset: number; //中间布局偏移

		public scale: number; //缩放值

		public constructor() {
			this.init();
		}

		public init() {
			this.horizontal = { x: 0, y: 0 }; //横屏位置
			this.vertical = { x: 0, y: 0 }; //竖屏位置

			this.topSpace = .03; //上间距
			this.rightSpace = 0; //右间距
			this.bottomSpace = .001; //下间距
			this.leftSpace = .01; //左间距

			this.horRatio = 20; //横屏占比(%) (有赋值时使用占比适配)
			this.verRatio = null; //竖屏占比(%) (有赋值时使用占比适配)
			this.horSpace = null; //logo与btn横屏间距
			this.verSpace = null; //logo与btn竖屏间距

			this.center = null; //中间布局
			this.centerOffset = null; //中间布局偏移

			this.scale = 1; //缩放值
		}
	}
}