import React, { useEffect, useState } from 'react';
import Bread from '../components/Bread';
import FileItem from '../components/FileItem';

const Content = () => {
  const [path, setPath] = useState(['root']);
  const [items, setItems] = useState([]);
  const [file, setFile] = useState();
  const [networkError, setNetworkError] = useState(false);

  const fetchData = (path = ['root']) => {
    return fetch('/api?path=' + path)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setNetworkError(false);
      });
  };

  useEffect(() => {
    fetchData()
      .then(setNetworkError(false))
      .catch((err) => setNetworkError(true));
  }, []);

  const iconClick = (item) => {
    if (path.length === 0 || path[path.length - 1] !== item.name) {
      if (item.type === 'dir') {
        fetchData([...path, item.name])
          .then(() => {
            setNetworkError(false);
            setPath([...path, item.name]);
            setFile(null);
          })
          .catch((err) => {
            setNetworkError(true);
          });
      } else {
        setPath([...path, item.name]);
        setFile(item.name);
      }
    }
  };

  const breadClick = (index) => {
    if (index === 0) {
      fetchData(['root'])
        .then(() => {
          setNetworkError(false);
          setPath(['root']);
        })
        .catch((err) => {
          setNetworkError(true);
        });
    } else if (index !== path.length - 1) {
      fetchData([...path].slice(0, index + 1))
        .then(() => {
          setNetworkError(false);
          setPath([...path].slice(0, index + 1));
          setFile(null);
        })
        .catch((err) => {
          setNetworkError(true);
        });
    }
  };

  return (
    <div>
      {networkError ? <h3>Server is disconnected! Try again later.</h3> : null}
      <Bread
        path={path}
        click={(index) => {
          breadClick(index);
        }}
      />
      {file ? (
        <h3>{file}</h3>
      ) : (
        items &&
        items.length > 0 &&
        items.map((item, index) => (
          <FileItem
            key={index}
            type={item.type}
            name={item.name}
            click={() => {
              iconClick(item);
            }}
          />
        ))
      )}
    </div>
  );
};

export default Content;
