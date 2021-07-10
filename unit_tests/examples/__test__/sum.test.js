const math = require('../mainFunctions/maths/maths')

// import math from '../maths';

test('add 1 plus 2', ()=>{
    expect(math.sum(1, 2)).toBe(3)
})

