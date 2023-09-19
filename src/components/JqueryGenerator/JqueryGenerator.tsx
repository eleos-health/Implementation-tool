import React from 'react';
import { getFields } from '../../context/Context';

const JqueryGenerator = () => {
  const fields = getFields();
  return (<div>
    {fields.map((field) => <div>{field.title}</div>)}
  </div>);
};

export default JqueryGenerator;
