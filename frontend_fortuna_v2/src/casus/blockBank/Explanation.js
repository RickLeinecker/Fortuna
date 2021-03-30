import React from 'react'

// will return components with real code images
function Explanation({ choice }) {

  const choices = {
    CONTROL_FLOW: 'CONTROL_FLOW',
    VARIABLES: 'VARIABLES',
    MATH: 'MATH',
    DOUBLES: 'DOUBLES',
    LOGIC: 'LOGIC',
    INTEGERS: 'INTEGERS',
    LISTS: 'LISTS',
    DEBUG: 'DEBUG',
    FUNCTIONS: 'FUNCTIONS'
  }

  const pstyle = {
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
  }

  const imgStyle = {
    borderRadius: "20px",
    boxShadow: "2px 2px 2px 2px 5px grey"
  }

  if (choice === choices.CONTROL_FLOW)
  {
    return (
      <div>
        <p style={pstyle}>Info on Control Flow</p>
        <br/>
        <p style={pstyle}>
          If statements are used to execute different lines of code,
          depending on the existing conditions. An if statement is paired
          with a conditional statement, and specifies a group of code lines
          that is only executed when the given condition is true. An else statement
          afterwards specifies another group of code lines that is only executed with the condition is false.
        </p>
        <img style={imgStyle} src="/help/if_statement.png" alt="image"/>
        <p style={pstyle}>
          A for loop is used to repeat lines of code when you are
          uncertain exactly how many times they should be repeated.
          A while loop is paired with a conditional statement, and
          specifies a group of code lines that is executed repeatedly while
          the given condition is true. The given condition is re-evaluated before
          each execution of the group of code lines.
        </p>
        <img style={imgStyle} src="/help/while_loop.png" alt="image" width="600" height="300" />
        <p style={pstyle}>
          A for loop is used to repeat lines of code when you know how many
          times you want to repeat them. The for loop uses a counter variables,
          usually denoted by 'i', to keep track of how many times the loop has repeated.
          The for loop consists of: a counter variable with an initial value, an inequality
          that contains the counter variable, and a statement that modifies the value of the
          counter variable at the end of each loop. The for loop also specifies a group of code
          lines that should be executed repeatedly while the counter inequality is true.
        </p>
        <img style={imgStyle} src="/help/for_loop.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.VARIABLES)
  {
    return (
      <div>
        <p style={pstyle}>Info on Variables</p>
        <br/>
        <p style={pstyle}>
          Variables, like in math, are names that represent values
          in code for easy reference. Variables can represent different
          types of values. In Casus, the three types of variables are
          integers (int), numbers with decimals (doubles), and true/false values (booleans)
        </p>
        <img style={imgStyle} src="/help/variables.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.MATH)
  {
    return (
      <div>
        <p style={pstyle}>Info on Math</p>
        <br/>
        <p style={pstyle}>The Math library provides multiple trigonometric functions, as well as square root and exponentiation. These functions only take doubles as inputs, and only output double values.</p>
        <img style={imgStyle} src="/help/math1.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.INTEGERS)
  {
    return (
      <div>
        <p style={pstyle}>Info on Integer Operations</p>
        <br/>
        <p style={pstyle}>The integer operations have return types varying from booleans to doubles to integers. For the following examples, let:</p>
        <img style={imgStyle} src="/help/int1.png" alt="image"/>
        <br/>
        <p style={pstyle}>The operations that return booleans are inequalities.</p>
        <img style={imgStyle} src="/help/int2.png" alt="image"/>
        <br/>
        <p style={pstyle}>The operations that return integers are arithmetic, modulo, absolute value, and min/max.</p>
        <img style={imgStyle} src="/help/int3.png" alt="image"/>
        <br/>
        <p style={pstyle}>Converting a integer to a double will return a double.</p>
        <img style={imgStyle} src="/help/int4.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.DOUBLES)
  {
    return (
      <div>
        <p style={pstyle}>Info on Doubles Operations</p>
        <br/>
        <p style={pstyle}>The doubles operations have return types varying from booleans to doubles to integers. For the following examples, let:</p>
        <img style={imgStyle} src="/help/doub1.png" alt="image"/>
        <br/>
        <p style={pstyle}>The operations that return booleans are inequalities.</p>
        <img style={imgStyle} src="/help/doub2.png" alt="image"/>
        <br/>
        <p style={pstyle}>The operations that return doubles are arithmetic, absolute value, and min/max.</p>
        <img style={imgStyle} src="/help/doub3.png" alt="image"/>
        <br/>
        <p style={pstyle}>Rounding and truncating a double will return an integer.</p>
        <img style={imgStyle} src="/help/doub4.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.LOGIC)
  {
    return (
      <div>
        <p style={pstyle}>Info on Logic operations</p>
        <br/>
        <p style={pstyle}>Logic operations work with boolean values, and output boolean values. For the following examples, let:</p>
	   <img style={imgStyle} src="/help/logic1.png" alt="image"/>
	   <br/>
	   <p style={pstyle}>Logical AND returns True only when both operands are True, otherwise it returns False.</p>
	   <img style={imgStyle} src="/help/logic2.png" alt="image"/>
	   <br/>
	   <p style={pstyle}>Logical OR returns False only when both operands are False, otherwise it returns True.</p>
	   <img style={imgStyle} src="/help/logic3.png" alt="image"/>
	   <br/>
	   <p style={pstyle}>Logical XOR returns False when both operands are the same, otherwise it returns True.</p>
	   <img style={imgStyle} src="/help/logic4.png" alt="image"/>
	   <br/>
	   <p style={pstyle}>Logical NOT returns the opposite of the input operand.</p>
	   <img style={imgStyle} src="/help/logic5.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.LISTS)
  {
    return (
      <div>
        <p style={pstyle}>Info on Lists</p>
        <br/>
        <p style={pstyle}>
          Lists are used to group and organize values.
          Lists collect values sequentially, and keep track
          of each values' position in the list. Values in the
          list can be created, modified, and deleted from any position in the list.
        </p>
        <img style={imgStyle} src="/help/lists.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.DEBUG)
  {
    return (
      <div>
        <p style={pstyle}>Info on Debugging</p>
        <br/>
        <p style={pstyle}>Debugging is the process of finding and fixing errors in your code. The most simple method of debugging is to log the values of variables in the intermediate steps of your code to ensure that everything is being calculated properly.</p>
	   <p style={pstyle}>This can be done using the print function.</p>
	   <img style={imgStyle} src="/help/debug1.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.FUNCTIONS)
  {
    return (
      <div>
        <p style={pstyle}>Info on Functions</p>
        <br/>
        <p style={pstyle}>
          Functions are named groups of code lines for easy reference.
          Functions have 0 or more input parameters, which are values
          that are given to the function and used when executing its
          corresponding codelines. Functions also have a return value,
          which is the output of the function, if any.
        </p>
        <img style={imgStyle} src="/help/functions.png" alt="image"/>
      </div>
    )
  }
  else
  {
    return (<div>Error</div>)
  }

}

export default Explanation
