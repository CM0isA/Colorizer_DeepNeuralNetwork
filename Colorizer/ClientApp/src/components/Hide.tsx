import React, {ReactNode} from 'react';
import {Box, BoxProps} from "@material-ui/core";

export interface HideProps extends BoxProps {
  if: boolean;
  children: ReactNode;
  box?: boolean;
}

function Hide(props: HideProps) {
  const boxProps = {
    ...props,
    if:undefined,
    box:undefined,
  }
  const content = () => props.box ? <Box {...boxProps}>{props.children}</Box> : <>{props.children}</>;
  return props.if ? null : content();
}

export default Hide;
