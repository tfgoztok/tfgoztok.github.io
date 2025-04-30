"use strict";

// 1a) Function to compute sum of squares using functional programming
const computeSumOfSquares = (numbers) => {
    return numbers.reduce((sum, num) => sum + num * num, 0);
};

// 1b) Function to print odd numbers
function printOddNumbersOnly(numbers) {
    numbers.filter(num => num % 2 !== 0).forEach(num => console.log(num));
}

// 1c) Function to print Fibonacci sequence
const printFibo = (n, a, b) => {
    if (n <= 0) return;
    
    const fibo = [a];
    if (n > 1) fibo.push(b);
    
    for (let i = 2; i < n; i++) {
        fibo.push(fibo[i-1] + fibo[i-2]);
    }
    
    console.log(fibo.join(", "));
};

// 2. Destructuring assignment
let user = { name: "John", years: 30 };
let { name, years: age, isAdmin = false } = user;

// 3. Library books functions
let libraryBooks = [
    { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
    { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
    { title: "The Road Ahead", author: "Bill Gates", ID: 4268 },
    { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", ID: 3257 }
];

// Add a new book
const addBook = (title, author, ID) => {
    // Check if book with same ID exists
    if (libraryBooks.some(book => book.ID === ID)) {
        return null;
    }
    
    const newBook = { title, author, ID };
    libraryBooks.push(newBook);
    return newBook;
};

// Get all book titles sorted alphabetically
const getTitles = () => {
    return libraryBooks.map(book => book.title).sort();
};

// Find books by title keyword
const findBooks = (keyword) => {
    return libraryBooks
        .filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()))
        .sort((a, b) => a.ID - b.ID);
};

// 4. Data management functions
let data = [];

export function get_items() {
    return data;
}

export function add_item(new_item) {
    if (data.some(item => item.id === new_item.id)) {
        return false;
    }
    data.push(new_item);
    return true;
}

export function update_item_title_by_id(id, new_title) {
    const item = data.find(item => item.id === id);
    if (!item) {
        return false;
    }
    item.title = new_title;
    return true;
}

export function delete_item_by_id(id) {
    const initialLength = data.length;
    data = data.filter(item => item.id !== id);
    return data.length !== initialLength;
}

export function get_item_title_by_id(id) {
    const item = data.find(item => item.id === id);
    return item ? item.title : undefined;
}

// Test cases
console.log("Testing computeSumOfSquares:", computeSumOfSquares([1, 2, 3])); // Should output: 14

console.log("\nTesting printOddNumbersOnly:");
printOddNumbersOnly([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Should print: 1, 3, 5, 7, 9

console.log("\nTesting printFibo:");
printFibo(10, 0, 1); // Should print: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

console.log("\nTesting destructuring:");
console.log(name); // Should output: John
console.log(age); // Should output: 30
console.log(isAdmin); // Should output: false

console.log("\nTesting library functions:");
console.log("Adding new book:", addBook("New Book", "New Author", 9999));
console.log("All titles:", getTitles());
console.log("Books with 'Road' in title:", findBooks("Road")); 