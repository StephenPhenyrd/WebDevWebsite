/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/



/*
use('TipsyBlogger');


db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
*/

/* global use, db */

// Select the database to use
use('TipsyProject'); // Replace with your actual database name

// Insert a few reviews into the reviews collection
db.getCollection('reviews').insertMany([
  {
    location: 'Bar A',
    barRating: 5,
    drink: 'Mojito',
    drinkRating: 4,
    review: 'Great place!',
    date: new Date()
  },
  {
    location: 'Bar B',
    barRating: 4,
    drink: 'Whiskey Sour',
    drinkRating: 5,
    review: 'Amazing drinks!',
    date: new Date()
  }
]);

// Find all reviews for a specific location
const reviewsAtBarA = db.getCollection('reviews').find({
  location: 'Bar A'
}).toArray();

// Print the reviews to the output window
console.log('Reviews for Bar A:', reviewsAtBarA);

// Update a review (e.g., changing the barRating for Bar A)
db.getCollection('reviews').updateOne(
  { location: 'Bar A' }, // Filter to find the review
  { $set: { barRating: 4, review: 'Updated review text' } } // Update operation
);

// Print the updated document
const updatedReview = db.getCollection('reviews').find({
  location: 'Bar A'
}).toArray();
console.log('Updated Review for Bar A:', updatedReview);

// Delete a review (e.g., removing Bar B's review)
db.getCollection('reviews').deleteOne({ location: 'Bar B' });

// Confirm deletion
const remainingReviews = db.getCollection('reviews').find().toArray();
console.log('Remaining Reviews:', remainingReviews);

// Run an aggregation to group reviews by barRating and count them
const reviewsGroupedByRating = db.getCollection('reviews').aggregate([
  { $group: { _id: '$barRating', count: { $sum: 1 } } }
]).toArray();

// Print the aggregation results
console.log('Reviews grouped by barRating:', reviewsGroupedByRating);