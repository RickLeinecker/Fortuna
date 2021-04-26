import React, { useState } from 'react'
import { getComponentPoints, getComponentType } from '../globalComponents/GetInventoryInfo.js';
import { toTitleCase } from '../globalComponents/Utility.js';

/*
  checkPoints
  updatePoints
  updateComponent
*/
function EquipMenu({ checkPoints, updatePoints, updateComponent, componentList, currentPartIndex, part, closeModals }) {

  const divStyle = {
    color: "white",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    left: "25%"
  }

  const tableStyle = {
    border: "3px solid #04CCFF",
    textAlign: "center"
  }

  return (
    <div>
      {(currentPartIndex === -1) ?
					<div></div> :
					<div data-testid="equipRoot">
						<h4 className="font" style={divStyle}>Component Menu</h4>
                      <br/>
						<div className="componentMenu">
							<table style={tableStyle}>
								<thead>
									<tr>
										<th style={tableStyle} className="font">Component Name</th>
										<th style={tableStyle} className="font">Number Owned</th>
										<th style={tableStyle} className="font">Item's Point Vaule</th>
									</tr>
								</thead>
								<tbody>
									{(componentList == null) ? <tr></tr> : componentList.map(({componentName, numberOwned}, index) => (
										<tr key={index}>
											<td style={tableStyle} align="left">
												<button
													className="componentMenuBtn font"
													onClick={() => { updateComponent(componentName, currentPartIndex); closeModals(part);}}
													disabled={checkPoints(componentName, currentPartIndex)}
												>
													{toTitleCase(componentName)}
												</button>
											</td>
											<td style={tableStyle}>{numberOwned}</td>
											<td style={tableStyle}>{getComponentPoints(componentName)}</td>
										</tr>
									))}
									{(currentPartIndex === 0 || currentPartIndex === 7) ?
										<tr></tr> :
										<tr>
											<td style={tableStyle} align="left">
												<button
													className="componentMenuBtn font"
													onClick={() => {updateComponent('empty', currentPartIndex); closeModals(part);}}
												>
													Empty
												</button>
											</td>
											<td style={tableStyle}></td><td style={tableStyle}></td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
				}
    </div>
  )
}

export default EquipMenu
