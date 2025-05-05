// Question 1 is below here
function Student(studentId) {
    this.studentId = studentId;
    this.answers = [];
}

Student.prototype.addAnswer = function(question) {
    this.answers.push(question);
};

function Question(qid, answer) {
    this.qid = qid;
    this.answer = answer;
}

Question.prototype.checkAnswer = function(answer) {
    return this.answer === answer;
};

function Quiz(questions, students) {
    this.questions = new Map();
    this.students = students;
    
    questions.forEach(question => {
        this.questions.set(question.qid, question.answer);
    });
}

Quiz.prototype.scoreStudentBySid = function(sid) {
    const student = this.students.find(s => s.studentId === sid);
    if (!student) return 0;
    
    let score = 0;
    student.answers.forEach(answer => {
        const correctAnswer = this.questions.get(answer.qid);
        if (correctAnswer === answer.answer) {
            score++;
        }
    });
    return score;
};

Quiz.prototype.getAverageScore = function() {
    if (this.students.length === 0) return 0;
    
    const totalScore = this.students.reduce((sum, student) => {
        return sum + this.scoreStudentBySid(student.studentId);
    }, 0);
    
    return totalScore / this.students.length;
};

// Testing time now
const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students = [student1, student2];
const questions = [
    new Question(1, 'b'),
    new Question(2, 'a'),
    new Question(3, 'b')
];

const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10);

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11);

let average = quiz.getAverageScore();
console.log(average);