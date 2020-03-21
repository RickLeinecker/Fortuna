//@flow strict

// 4 Tread types:
// 
// Tread 1: Heavily Armored Treads
//   -2 linear speed, -1 rot speed, +2 armor, +2 point cost
//
// Tread 2: Advanced Treads
//   +2 linear speed, +1 rot speed, +0 armor, +2 point cost
//	
// Tread 3: Fast Treads
//   +1 linear speed, +1 rot speed, +0 armor, +1 point cost
//
// Tread 4: Armored Treads
//   -1 linear speed, -1 rot speed, +1 armor, +1 point cost

type TreadType = 'TREAD_1' | 'TREAD_2' | 'TREAD_3' | 'TREAD_4';

export type {TreadType};