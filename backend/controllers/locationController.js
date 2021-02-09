const { root } = require('../data');

const search = (req, res) => {
  const items = [];

  const addItem = (obj) => {
    const names = Object.keys(obj.children);
    if (names.length > 0) {
      names.map((name) => {
        items.push({ name: name, type: obj.children[name].type });
      });
    }
    res.send(JSON.stringify(items));
  };

  const path = req.query.path.split(',');

  if (path.length === 1 && path[0] === 'root') {
    addItem(root);
  } else {
    const path = req.query.path.split(',');
    let current = root;
    for (let i = 1; i < path.length; i++) {
      if (current.children) {
        current = current.children[path[i]];
      }
    }

    //current exists
    if (current) {
      if (current.type === 'dir') {
        addItem(current);
      }
    } else {
      addItem(root);
    }
  }
};

module.exports = { search };
