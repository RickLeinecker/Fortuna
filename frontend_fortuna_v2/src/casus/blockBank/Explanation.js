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
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
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
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="/help/if_statement.png" alt="image"/>
        <p style={pstyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ducimus enim, obcaecati maxime ullam commodi debitis doloribus quibusdam aliquam. Sint est maiores dolores vel? Doloribus deleniti nemo perferendis id ullam.</p>
        <img style={imgStyle} src="/help/while_loop.png" alt="image" width="600" height="300" />
        <p style={pstyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel amet, magnam eaque deleniti at maxime error harum aperiam deserunt quod qui fuga, laudantium iure alias doloribus. Tempora, ducimus! Reprehenderit, velit!</p>
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
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="/help/variables.png" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.MATH)
  {
    return (
      <div>
        <p style={pstyle}>Info on Math (idk what to put here yet)</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.DOUBLES || choice === choices.INTEGERS)
  {
    return (
      <div>
        <p style={pstyle}>Info on separating operations with doubles and integers</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.LOGIC)
  {
    return (
      <div>
        <p style={pstyle}>Info on Logic operations</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    ) 
  }
  else if (choice === choices.LISTS)
  {
    return (
      <div>
        <p style={pstyle}>Info on Lists</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    )  
  }
  else if (choice === choices.DEBUG)
  {
    return (
      <div>
        <p style={pstyle}>Info on Debugging</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    )
  }
  else if (choice === choices.FUNCTIONS)
  {
    return (
      <div>
        <p style={pstyle}>Info on Functions</p>
        <br/>
        <p style={pstyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quaerat dignissimos? Eos nisi cumque modi non. Molestiae iure accusantium voluptatibus enim ipsa, velit necessitatibus, aperiam amet, facere eum omnis temporibus.</p>
        <img style={imgStyle} src="" alt="image"/>
      </div>
    ) 
  }
  else
  {
    return (<div>Error</div>)
  }

}

export default Explanation
