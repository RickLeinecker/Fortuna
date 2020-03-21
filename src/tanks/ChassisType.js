//@flow strict

// 5 Chassis types:
//
// Chassis 1: Light
// 	-Fast, quick to turn
//
// Chassis 2: Heavy
//  -strongest and slowest
// 
// Chassis 3: Modable
//  -medium in pretty much all respects
//
// Chassis 4: Modable Heavy
//  -slower, medium health, but more free slots
//
// Chassis 5: Modable Light
//  -light and fast, weakest, more free slots
//
type ChassisType = 'CHASSIS_1' | 'CHASSIS_2' | 'CHASSIS_3' | 'CHASSIS_4' | 'CHASSIS_5';

export type {ChassisType};