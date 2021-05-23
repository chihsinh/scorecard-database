## Scorecard Database
**An assignment of Web Programming (2021 spring), a course by Professor Ric Huang in NTU.** A practice on React.js, Axios, Express, and Mongoose.

### How it Works
When users first enter, the page is shown as below.
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot1.png" width="600">
</p>

Each scorecard includes a name, a subject, and a corresponding score. Users can insert scorecards by filling in the name, subject, and score inputs, and pressing the "Add" button.
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot2.png" width="600">
</p>

If there is already a scorecard in the database with the same combination of name and subject, the system will update the existing scorecard by replacing the score with the new input. Otherwise, a new scorecard will be added to the database.
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot3.png" width="600">
</p>

Users can delete all scorecards in the database by clicking the "Clear" button.
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot4.png" width="600">
</p>

To search for scorecards under certain conditions, users can fill in the conditions in the inputs, and click the "Query" button. For example, below is the query result for the condition "subject: Math". If there are more than five scorecards meeting the search condition, the site just shows the first five scorecards and users have to click on “Next” or other page numbers to view more. The system sorts the results by the alphabetical order of the names and subjects.
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot5.png" width="600">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot6.png" width="600">
</p>

Another example query result for the condition "name: alice". The system can still get the query results even if the input is not capitalized.
<p align="center">
  <img src="https://raw.githubusercontent.com/kanapki/scorecard-database/master/screenshots/screenshot7.png" width="600">
</p>
