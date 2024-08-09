/* 
Write a function that takes in an array of integers and a callback function, and returns a new array where each
element is doubled using the callback.
*/
// Function to double each element in an array using a callback
function doubleArrayElements(arr, callback) {
    return arr.map(callback);
}

// Callback function to double a number
function double(num) {
    return num * 2;
}

// Example array of integers
const numbers = [1, 2, 3, 4, 5];

// Call the function to double the elements
const doubledNumbers = doubleArrayElements(numbers, double);

// Output the doubled array
console.log("Original array:", numbers);
console.log("Doubled array:", doubledNumbers);


/* 
Write a function “manipulateString” that takes in a string and converts the characters to uppercase letters. The
function should return a callback function “logString” that logs the sentence “The manipulated string is: “ along
with the manipulated string or the new string to the console.
*/

// Function to manipulate the string and return a callback
function manipulateString(str) {
    // Convert the string to uppercase
    const manipulatedStr = str.toUpperCase();
    return function logString() {
        console.log(`The manipulated string is: ${manipulatedStr}`);
    };
}
const string = "hello, world!";
// Get the callback function after manipulating the string
const logResult = manipulateString(string);
// Call the callback function to log the result
logResult();


/*  

Write a JavaScript function called ageInDays that accepts an object containing a person's first name, last
name, and age in years as input. The function should concatenate the first and last name into a single string
and store it in a variable called fullName. It should then calculate the person's age in days and store it in a
variable called ageInDays.
The ageInDays function should then return a callback function that logs a message to the console. The
message should include the person's full name and age in days, and should be in the format: "The person's full
name is [full name] and their age in days is [age in days]."
Note that the ageInDays function should not log the message to the console directly, but should instead return
a callback function that can be used to log the message at a later time.
*/
// Function to calculate age in days and return a callback
function ageInDays(person) {
    // Concatenate first and last name into fullName
    const fullName = `${person.firstName} ${person.lastName}`;

    // Calculate age in days
    const ageInDays = person.age * 365;

    // Return a callback function that logs the message
    return function() {
        console.log(`The person's full name is ${fullName} and their age in days is ${ageInDays}.`);
    };
}

// Example usage
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};

// Get the callback function
const logAgeInDays = ageInDays(person);

// Call the callback function to log the result
logAgeInDays();


/* 
Write a program that accepts a list of objects representing books [ title, author, and year] and a callback
function. The program should use the map function to create a new list containing only the titles of the books,
and then pass this new list to the callback function. The callback function should then log the titles to the
console in alphabetical order.
*/

// Function to process books and pass titles to a callback
function processBooks(books, callback) {
    // Create a new list containing only the titles of the books
    const titles = books.map(book => book.title);

    // Pass the list of titles to the callback function
    callback(titles);
}

// Callback function to log titles in alphabetical order
function logTitlesInOrder(titles) {
    // Sort the titles in alphabetical order
    const sortedTitles = titles.sort();

    // Log the sorted titles
    console.log("Book titles in alphabetical order:");
    sortedTitles.forEach(title => console.log(title));
}

// Example list of books
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 }
];

// Process the books and use the callback to log titles
processBooks(books, logTitlesInOrder);

/* 
You need to write a function that takes a name as input and returns a promise that resolves with a greeting
message. The function should greet the person using their name, with a message in the format "Hello, {name}!".
For example, if the input to the function is "Mithun", the promise should resolve with the string "Hello, Mithun!".
*/

// Function that returns a promise with a greeting message
function greet(name) {
    return new Promise((resolve, reject) => {
        // Check if the name is valid
        if (typeof name === 'string' && name.trim() !== '') {
            // Resolve the promise with the greeting message
            resolve(`Hello, ${name}!`);
        } else {
            // Reject the promise if the name is invalid
            reject('Invalid name provided.');
        }
    });
}

// Example usage
greet("Mithun")
    .then(message => console.log(message))  // Logs: "Hello, Mithun!"
    .catch(error => console.error(error));   // Handles any errors


/* 
 Write a function that asynchronously fetches data from an API
[ https://jsonplaceholder.typicode.com/todos/1 ]and logs the result to the console.
*/

// Async function to fetch data from the API and log the result
async function fetchData() {
    try {
        // Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

        // Check if the response is OK (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Log the result to the console
        console.log('Fetched data:', data);
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();


/* 
Create an asynchronous function that retrieves data from two different API endpoints: "https://
jsonplaceholder.typicode.com/todos/1" and "https://jsonplaceholder.typicode.com/posts/1". The first API returns
a to-do task, while the second API provides post details. The function should combine the results from both APIs
and log them as an object, where the keys are "todo" and "post", and the corresponding values are the
responses from the respective APIs.
*/
// Async function to fetch data from two APIs and combine the results
async function fetchCombinedData() {
    try {
        // Fetch data from the first API
        const [todoResponse, postResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos/1'),
            fetch('https://jsonplaceholder.typicode.com/posts/1')
        ]);

        // Check if the responses are OK
        if (!todoResponse.ok || !postResponse.ok) {
            throw new Error(`HTTP error! Status: ${todoResponse.status} or ${postResponse.status}`);
        }

        // Parse JSON data from the responses
        const todoData = await todoResponse.json();
        const postData = await postResponse.json();

        // Combine the results into a single object
        const combinedData = {
            todo: todoData,
            post: postData
        };

        // Log the combined result
        console.log('Combined data:', combinedData);
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and combine data
fetchCombinedData();


/* 
Write a JavaScript program that uses the Fetch method to retrieve data from an API, and then logs the data to
the console. For example, you could use the API at https://jsonplaceholder.typicode.com/posts to retrieve a list
of posts, and then display them to the browser console.
*/

// Function to fetch data from the API and log it to the console
async function fetchPosts() {
    try {
        // Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is OK (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const posts = await response.json();

        // Log the posts to the console
        console.log('Posts data:', posts);
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching posts:', error);
    }
}

// Call the function to fetch and log the posts
fetchPosts();




