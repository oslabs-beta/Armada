import React, { useState, useEffect } from "react";
import fetch from "fetch";

function NodesCount() {
	const [nodes, setNodes] = useState([]);
	useEffect(() => {
		fetch("/api/nodesList")
			.then((res) => res.json())
			.then((data) => setNodes(data));
	});

	return <div>NodeList {nodes.length}</div>;
}

export default NodesCount;
