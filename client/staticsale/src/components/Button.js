import React from 'react';

export function Button(props){
  return(
    <button className="text-white bg-blue-500 hover:bg-blue-600 rounded m-1 px-2" type='button' onClick={()=>props.onClick()}>{props.name}</button>
  );
}
