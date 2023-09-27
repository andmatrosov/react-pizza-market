import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#e6e6e6"
    foregroundColor="#ffffff"
    {...props}>
    <circle cx="140" cy="130" r="110" />
    <rect x="0" y="260" rx="4" ry="4" width="280" height="30" />
    <rect x="0" y="310" rx="4" ry="4" width="280" height="74" />
    <rect x="0" y="424" rx="4" ry="4" width="110" height="33" />
    <rect x="125" y="412" rx="24" ry="24" width="155" height="48" />
  </ContentLoader>
);

export default Skeleton;
