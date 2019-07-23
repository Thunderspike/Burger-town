import React from "react";

const getWidth = size => Math.round((size / 12) * 10e7) / 10e5 + "%";

export default function Grid({ style = {}, ...props }) {
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  let defaultSize = 12;
  for (let s of sizes) {
    const sz = props[s];
    if (sz !== undefined) defaultSize = sz;
  }

  const size = props.width || defaultSize;
  const width = getWidth(size);
  if (size === 0) return null;

  const padding = props.padding || "20px";

  const container = {
    "--padding": padding,
    boxSizing: "border-box",
    flexWrap: "wrap",
    display: "flex",
    margin: `calc(-0.5 * var(--padding))`,
    width: `calc(100% + var(--padding))`
  };
  const item = {
    boxSizing: "border-box",
    flexBasis: width,
    maxWidth: width,
    padding: `calc(var(--padding) / 2)`
  };
  let styles = {};
  if (props.container) styles = { ...styles, ...container };
  if (props.item) styles = { ...styles, ...item };

  return <div style={{ ...styles, ...style }} children={props.children} />;
}
