1-undefined 

Global EC creation:
Outer: null
LE: {a: undefined, b: undefined, c: undefined}
TDZ: {x}

Global EC execution:
Outer: null
LE: {a: 5, b: 10, c: function}
TDZ: {x}
x is initialized with undefined
LE: {a: 5, b: 10, c: function, x: undefined}


c FEC (Function Execution Context) creation:
Outer: Global EC
LE: {a: 8, b: 9, c: 10}
TDZ: {}
Variable x is hoisted: LE: {a: 8, b: 9, c: 10, x: undefined}

c FEC execution:
Prints x (undefined from c's scope)
Prints a (8)
f FEC creation:

Outer: c FEC
LE: {a: 8, b: 9, c: 10, x: undefined}
TDZ: {}

f FEC execution:
b = a (now b is 8 in f's scope)
Prints b (8)
b = c (now b is 10 in f's scope)
Local x is defined and set to 5
f FEC is popped off the stack


c FEC execution continues:
Prints b (still 9 in c's scope as changes in f were local)
Local x is defined and set to 10
c FEC is popped off the stack


Global EC execution continues:
Prints b (10 from global scope)
Prints x (undefined from global scope)

2-81 25

Global EC creation:
Outer: null
LE: {x: undefined, myFunction: function}
TDZ: {}

Global EC execution:
x is assigned 9
LE: {x: 9, myFunction: function}
myFunction FEC creation:

Outer: Global EC
LE: {}
TDZ: {}

myFunction FEC execution:
x is not in local scope, looks up to global scope (x is 9)
Returns 9 * 9 = 81
myFunction FEC is popped off the stack

Global EC execution continues:
Prints 81
x is assigned 5
LE: {x: 5, myFunction: function}
myFunction FEC creation:

Outer: Global EC
LE: {}
TDZ: {}

myFunction FEC execution:
x is not in local scope, looks up to global scope (x is now 5)
Returns 5 * 5 = 25
myFunction FEC is popped off the stack

3-10

Global EC creation:
Outer: null
LE: {foo: undefined, bar: function}
TDZ: {}

Global EC execution:
foo is assigned 1
LE: {foo: 1, bar: function}


bar FEC creation:
Outer: Global EC
LE: {foo: undefined}
TDZ: {}


bar FEC execution:
if (!foo) evaluates to true because foo is hoisted but undefined in local scope
foo is assigned 10 in local scope
LE: {foo: 10}
Alerts foo (10 from local scope)
bar FEC is popped off the stack