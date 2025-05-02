Q1)
Output:
Greetings,  John
hi undefined
hello Smith

Global EC creation:
outer: null
this: window
LE: { str: uninitialized, user: uninitialized, show: fn }
TDZ: { str, user }

Global EC execution:
outer: null
this: window
LE: { str: "Greetings, ", user: {firstName: "John", lastname: "Smith", display: fn}, show: fn }
TDZ: {}

user.display() FEC creation:
outer: Global LE
this: user object
LE: {}
TDZ: {}

user.display() FEC execution:
outer: Global LE
this: user object
LE: {}
TDZ: {}
Action: Prints "Greetings, John" and calls show("hi")

show("hi") FEC creation:
outer: Global LE
this: undefined (in strict mode)
LE: { msg: "hi" }
TDZ: {}

show("hi") FEC execution:
outer: Global LE
this: undefined (in strict mode)
LE: { msg: "hi" }
TDZ: {}
Action: this.lastname undefined

show.call(user, "hello") FEC creation:
outer: Global LE
this: user object (explicitly set by call)
LE: { msg: "hello" }
TDZ: {}

show.call(user, "hello") FEC execution:
outer: Global LE
this: user object
LE: { msg: "hello" }
TDZ: {}
Action: Prints "hello Smith" by accessing this.lastname

Q2)
We can fix the problem by simply using bind function without creating any wrapper functions
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

Q3)
We can fix the problem by using bind again
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList: function() {
    this.students.forEach(function(student) {
      console.log(this.title + ": " + student);
    }.bind(this)); //this is the solution by bind
  }
};
group.showList();