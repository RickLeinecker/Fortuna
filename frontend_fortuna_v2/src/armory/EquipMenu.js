import React, { useState } from 'react'
import { getComponentPoints, getComponentType } from '../globalComponents/GetInventoryInfo.js';
import { toTitleCase } from '../globalComponents/Utility.js';

/*
  checkPoints
  updatePoints
  updateComponent
*/
function EquipMenu({ checkPoints, updatePoints, updateComponent, divStyle, componentList, currentPartIndex, part, closeModals }) {
  
  return (
    <div>
      {(currentPartIndex === -1) ?
					<div></div> :
					<div>
						<h4 className="font" style={divStyle}>Component Menu</h4>
						<div className="componentMenu">
							<table>
								<thead>
									<tr>
										<th className="font">Component Name</th>
										<th className="font">Number Owned</th>
										<th className="font">Point Value</th>
									</tr>
								</thead>
								<tbody>
									{(componentList == null) ? <tr></tr> : componentList.map(({componentName, numberOwned}, index) => (
										<tr key={index}>
											<td align="left">
												<button
													className="componentMenuBtn"
													onClick={() => { updateComponent(componentName, currentPartIndex); closeModals(part);}}
													disabled={checkPoints(componentName, currentPartIndex)}
												>
													{toTitleCase(componentName)}
												</button>
											</td>
											<td>{numberOwned}</td>
											<td>{getComponentPoints(componentName)}</td>
										</tr>
									))}
									{(currentPartIndex === 0 || currentPartIndex === 7) ?
										<tr></tr> :
										<tr>
											<td align="left">
												<button
													className="componentMenuBtn font"
													onClick={() => updateComponent('empty', currentPartIndex)}
												>
													Empty
												</button>
											</td>
											<td></td><td></td>
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
