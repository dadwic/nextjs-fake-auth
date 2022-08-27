import React from "react";

const ConditionalWrap = ({ condition, children, wrap }: any) =>
  condition ? React.cloneElement(wrap(children)) : children;

export default ConditionalWrap;
