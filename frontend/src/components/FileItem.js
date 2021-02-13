import React from 'react';

const spanStyle = {
  margin: '10px',
  display: 'inline-block',
};

const FileItem = ({ type, name, click }) => {
  const dir = () => (
    <span onClick={click} style={spanStyle}>
      <i className='fas fa-folder-open fa-3x' />
      <p>{name}</p>
    </span>
  );
  const file = () => (
    <span onClick={click} style={spanStyle}>
      <i className='far fa-file fa-3x' />
      <p>{name}</p>
    </span>
  );

  return <>{type === 'dir' ? dir() : file()}</>;
};

export default FileItem;
