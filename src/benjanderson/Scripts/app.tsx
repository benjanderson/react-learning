/// <reference path="../typings/main/ambient/react/index.d.ts" />
/// <reference path="../typings/main/ambient/react-dom/index.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
namespace Benjanderson {
	var array = ["aligator", "bear", "cat"];

	
	export class LayoutElement implements __React.ComponentLifecycle<JSX.Element, JSX.Element> {
		constructor() {
			this.render = this.render;
		}

		render(): JSX.Element {
			return (
				<div className="row fill">
					<div className="wrapper">
						<div className="col-md-3 col-sm-12 sidebar">
							{array.map((x, i) =>
								<p key={i + 1000}>{x} foo</p>
							) }
						</div>
						<div className="col-md-9 col-sm-12">
							{array.map((x, i) =>
								<p key={i}>{x}</p>
							) }
						</div>
					</div>
				</div>
			);
		}
	}
	
	var Layout = React.createClass(new LayoutElement());

	ReactDOM.render(
		<Layout />,
		document.getElementById('content')
	);
}