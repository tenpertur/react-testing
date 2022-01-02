import React from "react";
import "./Skeleton.sass"

export const Skeleton = ({ width, height }) => {
	return (<div className="skeleton shine" style={{
		"width": width,
		"height": height,
	}}  />)
}