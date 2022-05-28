import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ComponentWrapper from "../../../utils/ComponentWrapper";
import parseStatus from "../../../utils/parseStatus";

const mapStateToProps = ({ nodes }) => {
	return nodes;
};

const NodesStatus = ({ items }) => {
	const nodesObj = parseStatus(items);

	console.log("nodesObj", nodesObj);

	const NodeBoxes = [];
	for (let key of Object.keys(nodesObj)) {
		let boxStyle = {
			backgroundColor: "#3dce2d",
			border: "1px solid #39ba2a",
			borderRadius: "3px",
			// width: "20px",
			// height: "20px",
			margin: "1px",
		};

		if (nodesObj[key]["Ready"] === "False") {
			boxStyle["backgroundColor"] = "#ea2315";
			boxStyle["border"] = "1px solid #d82c20";
		} else if (nodesObj[key]["Ready"] === "Unknown") {
			boxStyle["backgroundColor"] = "yellow";
		}

		let tooltipText = `Name: ${key}\n`;
		for (let condition of Object.keys(nodesObj[key])) {
			tooltipText += `${condition}: ${nodesObj[key][condition]}\n`;
		}

		NodeBoxes.push(
			<div className="node-box" key={key}>
				<Tooltip title={tooltipText}>
					<Box
						className="status-box"
						style={boxStyle}
						key={`NODE${key}`}
						name={key}
						status={nodesObj[key]}
					>
						{key}
					</Box>
				</Tooltip>
			</div>
		);
	}

	return (
		<ComponentWrapper title="Node Status">
			<Box className="card" mt={1}>
				{/* <h4 className='card-label'>Node Status</h4> */}
				<div className="break"></div>
				<div className="card-content">{NodeBoxes}</div>
			</Box>
		</ComponentWrapper>
	);
};

export default connect(mapStateToProps)(NodesStatus);
