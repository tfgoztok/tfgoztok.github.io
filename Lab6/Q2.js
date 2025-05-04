function Student(firstName, lastName, grades = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = grades;
  }
  
  Student.prototype.inputNewGrade = function(newGrade) {
    this.grades.push(newGrade);
  };
  
  Student.prototype.computeAverageGrade = function() {
    if (this.grades.length === 0) return 0;
    return this.grades.reduce((a, b) => a + b, 0) / this.grades.length;
  };
  
  const s1 = new Student("Alice", "Smith", [90, 85, 88]);
  const s2 = new Student("Bob", "Brown", [75, 80, 79]);
  const s3 = new Student("Michael", "Jackson", [92, 95, 91]);
  
  const studentsArr = [s1, s2, s3];
  
  const allGrades2 = studentsArr.flatMap(s => s.grades);
  const averageAll2 = allGrades2.reduce((a, b) => a + b, 0) / allGrades2.length;
  console.log("Average grade for all students:", averageAll2);