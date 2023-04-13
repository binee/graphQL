 
 
 /**
  * Check if the payload has undefined Key or values
  */
 function checkKeyValue(payload) {

    const check  = Object
    .entries(payload)
    .every(([key, value]) => !['', 'null', 'undefined'].includes(key) && value);
    return check;
 }

 const Utility = {
    checkKeyValue
  }
  
  export default Utility;