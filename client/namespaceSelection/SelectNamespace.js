import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { setNamespace, fetchNamespacesList } from '../actions/actions';

function SelectNamespace({
  selectedNamespace,
  setNamespace,
  fetchNamespacesList,
}) {
  const [namespaceOptions, setNamespaceOptions] = useState([]);
  const getNamespaceList = () => {
    fetch('/api/namespaceList')
      .then((res) => res.json())
      .then((data) => {
        // setNamespaces(data);
        let names = ['All'];
        data.items.forEach((item) => {
          names.push(item.metadata.name);
        });
        fetchNamespacesList(names);
        return names;
      })
      .then((list) => {
        const options = list.map((el) => {
          return { value: el, label: el };
        });
        setNamespaceOptions(options);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getNamespaceList();
  }, []);

  function handleNamespaceChange(namespace) {
    // setSelectedState({ ...selectedState, namespace: namespace.value });
    setNamespace(namespace.value);
  }

  return (
    <Select
      name='namespace'
      defaultValue={selectedNamespace}
      options={namespaceOptions}
      onChange={handleNamespaceChange}
      placeholder='Select a namespace'
    />
  );
}
const mapStateToProps = ({ namespace }) => {
  return { ...namespace };
};

export default connect(mapStateToProps, { setNamespace, fetchNamespacesList })(
  SelectNamespace
);
