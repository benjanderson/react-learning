import React from 'react';
import ReactDOM from 'react-dom';

import myEditor from './Components/myEditor.jsx';

var Layout = React.createClass({
	render: function() {
		return (
      <div className="row fill">
				<div className="wrapper">
					<div className="col-md-3 col-sm-12 sidebar">
						{[...Array(10)].map((x, i) =>
							<p key={i+1000}>sidebar</p>
						)}
					</div>
					<div className="col-md-9 col-sm-12">
						{[...Array(100)].map((x, i) =>
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