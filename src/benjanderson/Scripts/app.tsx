/// <reference path="../typings/main/ambient/react/index.d.ts" />
/// <reference path="../typings/main/ambient/react-dom/index.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
namespace Benjanderson {
	var array = ["a", "b", "c"];

	var Layout = React.createClass({
		render() {
			return (
				<div className="row fill">
					<div className="wrapper">
						<div className="col-md-3 col-sm-12 sidebar">
							{array.map((x, i) =>
								<p key={i + 1000}>sidebar</p>
							)}
						</div>
						<div className="col-md-9 col-sm-12">
							{array.map((x, i) =>
								<p key={i}>weehoo</p>
							)}
						</div>
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(
		<Layout />,
		document.getElementById('content')
	);
}