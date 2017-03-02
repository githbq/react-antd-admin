import React from 'react';
import './index.less';

class Hello extends React.Component { 
  render() {
     return <div> 
      <input />
      <h1 className="testStyle" onClick={this.test}>AAAAAAAAA44445555!</h1>
    </div> ;
  }
  test=()=> {  
    debugger
    let x=1;
    debugger 
  }
  select(queryObj, page, pageSize) { 
  }
}

export default Hello;

