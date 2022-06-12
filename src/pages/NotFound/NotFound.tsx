import * as React from 'react';
import {styled} from "@mui/system";

export const Div = styled('div')`
  display: inline-block;
`;

export const NotFound: React.FC = () => (
  <Div>
    <h1>Not Found</h1>
    <p>The page was not found.</p>
  </Div>
);

