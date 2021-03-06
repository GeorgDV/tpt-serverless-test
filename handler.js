const _lodash = require('lodash');
const equalize = require('./equalize');
const getSelectedArray = require('./getSelectedArray');

module.exports.calculator = async (event) => {
  const value_1 = (event.queryStringParameters || {}).num_1 || 0;
  const value_2 = (event.queryStringParameters || {}).num_2 || 0;

  const operation = (event.queryStringParameters || {}).operation || '+';

  const answer = equalize(value_1, value_2, operation);

  const emptyArray = ['', '', '', '', '', '', '', '', ''];
  const selectedArray = getSelectedArray(operation, emptyArray);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `<div id="calculator"><h2>Homework Calculator! - Serverless App<h2>
      <form action="/dev/calc" method="GET" style="margin: 0 auto;">
      <input id="ValueInput1" type="number" name="num_1" placeholder="Value 1" value="${_lodash.escape(value_1)}"/>
      
      <select id="SelectOperation" name="operation">
        <option value="+" ${selectedArray[0]}> + </option>
        <option value="-" ${selectedArray[1]}> - </option>
        <option value="*" ${selectedArray[2]}> * </option>
        <option value="/" ${selectedArray[3]}> / </option>
        <option value=">" ${selectedArray[4]}> > </option>
        <option value=">=" ${selectedArray[5]}> >= </option>
        <option value="==" ${selectedArray[6]}> = </option>
        <option value="<=" ${selectedArray[7]}> =< </option>
        <option value="<" ${selectedArray[8]}> < </option>
      </select>

      <input id="ValueInput2" type="number" name="num_2" placeholder="Value 2" value="${_lodash.escape(value_2)}"/>
      <input id="OperationSubmit" type="submit" value="="/>
      <input id="AnswerOutput" type="text" name="answer" placeholder="Answer" value="${_lodash.escape(answer)}" disabled/>
      </form></div>

      <style>
        body {
          text-align: center;
        }

        form {
          display: inline-block;
          vertical-align: middle;
        }

        h2 {
          font-family: "Comic Sans MS", cursive, sans-serif;
        }

        div#calculator {
          border: solid black 5px;
          width: auto;
          background-color: cyan;
          border-radius: 50%;
          padding: 1em;
        }
      <style>
      `,
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
