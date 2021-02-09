import React from 'react';

const divStyle = {
  margin: '10px',
};
const spanStyle = {
  margin: '5px',
};

const Bread = ({ path, click }) => {
  return (
    <div style={divStyle}>
      {path.length > 0
        ? path.map((p, index) => (
            <span
              key={index}
              style={spanStyle}
              onClick={() => {
                click(index);
              }}
            >
              {`/${p}`}
            </span>
          ))
        : null}
    </div>
  );
};

export default Bread;
