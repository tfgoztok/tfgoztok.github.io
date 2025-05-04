const student = {
    firstName: "",
    lastName: "",
    grades: [],
    inputNewGrade(newGrade) {
      this.grades.push(newGrade);
    },
    computeAverageGrade() {
      if (this.grades.length === 0) return 0;
      return this.grades.reduce((a, b) => a + b, 0) / this.grades.length;
    }
  };
  
  const students = [
    Object.create(student),
    Object.create(student),
    Object.create(student)
  ];
  
  students[0].firstName = "Alice";
  students[0].lastName = "Smith";
  students[0].grades = [90, 85, 88];
  
  students[1].firstName = "Bob";
  students[1].lastName = "Brown";
  students[1].grades = [75, 80, 79];
  
  students[2].firstName = "Micheal";
  students[2].lastName = "Jacjkson";
  students[2].grades = [92, 95, 91];
  
  const allGrades = students.flatMap(s => s.grades);
  const averageAll = allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
  console.log("Average grade for all students:", averageAll);