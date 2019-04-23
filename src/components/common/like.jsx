import React from 'react';
// Input: Liked: boolean
// Output: onClick
// Stateless functional component

const Like = (props) => {
	let classes = 'fa fa-heart';
	if (!props.liked) classes += '-o';
	return <i onClick={props.onClick} style={{ cursor: 'pointer' }} className={classes} aria-hidden="true" />;
};

export default Like;
