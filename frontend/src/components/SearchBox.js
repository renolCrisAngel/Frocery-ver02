import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
      <div class="searchbox">  
        <form className="input-field-search" onSubmit={submitHandler}>
            <i className="fa fa-search"></i>
            <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={(e) => setName(e.target.value)}
            ></input>
        </form>
    </div>  
  );
}

