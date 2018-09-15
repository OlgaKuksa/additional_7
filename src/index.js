module.exports = function solveSudoku(matrix) {
  let sudokuData=matrix.reduce((accum, line, lineIndex)=>{return [...accum, ...line.map((elem, index)=>({
    line:lineIndex,
    column: index,
    squareNum:Math.floor(lineIndex/3)*3+Math.floor(index/3),
    squareLine:lineIndex%3,
    squareColumn:index%3,
    value: elem,
    possibleValues:[1,2,3,4,5,6,7,8,9]
  }))]}, []);
  let isAllTwoPlus=false;
  while (!isAllTwoPlus) {
    isAllTwoPlus=true;
    for (let elem of sudokuData)
    { 
      if (elem.value==0)
      {
      let linePV=returnMissing(sudokuData.filter(el=>el.line==elem.line&&el.value!=0).map(e=>e.value));
      let columnPV=returnMissing(sudokuData.filter(el=>el.column==elem.column&&el.value!=0).map(e=>e.value));
      let squarePV=returnMissing(sudokuData.filter(el=>el.squareNum==elem.squareNum&&el.value!=0).map(e=>e.value));
      elem.possibleValues=elem.possibleValues.filter(el=>linePV.includes(el)&&columnPV.includes(el)&&squarePV.includes(el));
      if (elem.possibleValues.length===1) 
      {elem.value=elem.possibleValues[0];
      isAllTwoPlus=false};
      }
    };
  };
  doBruteForce(sudokuData);
  const lines=matrix.map((line,index)=>index);
  const solvedSudoku=lines.map(line=>sudokuData.filter(elem=>elem.line===line).map(elem=>elem.value));
  return solvedSudoku;
};

const returnMissing = sudokuLine => {
  const fullLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return fullLine.filter(elem => !sudokuLine.includes(elem));
};

const isUniqueBy=(sudData, partName, partNumber)=>{
  let valuesSet=new Set();
  let count=0;
  for (let element of sudData)
 {
   if (element[partName]==partNumber)
   {count++;   
    if (element.value!=0)
    {if (valuesSet.has(element.value)) return false;
    valuesSet.add(element.value);
    };
    if (count==9) return true;
   };
 };
 return true;
};

const isByRules=(sudokuData, element)=>{

return isUniqueBy(sudokuData, "squareNum", element.squareNum)&&isUniqueBy(sudokuData, "line", element.line)&&isUniqueBy(sudokuData, "column", element.column)
}

const doBruteForce=(sudokuData)=>{
  const elementToFill=sudokuData.find(el=>el.value==0);
  if (!elementToFill) return true;
  for (let value of elementToFill.possibleValues)
  {
    elementToFill.value=value;
    if (isByRules(sudokuData, elementToFill)&&doBruteForce(sudokuData)) return true;
  };
  elementToFill.value=0;
  return false;
}