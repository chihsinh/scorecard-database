import React, {useState} from 'react';
import axios from 'axios';
import TopBar from '../components/topBar';
import Form from '../components/form';
import ShowBox from '../components/showBox';

const instance = axios.create({
  baseURL: `http://localhost:5000/scoreCards`,
});

function ScoreCardDB() {
  const [queryResult, setQueryResult] = useState([]);
  const [showText, setShowText] = useState('To add a scorecard to the database, fill in all 3 fields above, and press "Add". To search for scorecards in the database, fill in a certain condition of 1 or 2 fields, and press "Query".');
  const [input, setInput] = useState({
      name: null,
      subject: null,
      score: null});

  const setName = e => {
    setInput({...input, name: e.target.value.toLowerCase()});
    //console.log(input)
  }
  const setSubject = e => {
    setInput({...input, subject: e.target.value.toLowerCase()});
    //console.log(input)
  }
  const setScore = e => {
    if (isNaN(e.target.value)) {
      setShowText('Score must be a number!');
      document.getElementById('score').value = '';
    } else {
      setInput({...input, score: e.target.value});
    }
    //console.log(input)
  }
  const initInputState = () => {
    setInput({
        name: null,
        subject: null,
        score: null});
  }
  const initOutputState = () => {
    setShowText('');
    setQueryResult([]);
  }
  const initInputValue = () => {
    document.getElementById('name').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('score').value = '';
  }

  const capitalizeFst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  const handleClear = async (e) => {
    initOutputState();
    try {
      await instance.delete('/')
      .then(res => {
        //console.log(res.data);
        if (res.status === 200) {
          setShowText('Database cleared!');
          initInputValue();
        }
      })
    }
    catch (error) {
      if (error.response) {
        // Request made and server responded
        setShowText('Request made and server responded, some other problems occurred');
        initInputValue();
      } else if (error.request) {
        // The request was made but no response was received
        setShowText('The request was made but no response was received, something is wrong with the server');
        initInputValue();
      }
    }
  }

  const handleAdd = async (e) => {
    initOutputState();
    if (input.name === null || input.subject === null || input.score === null) {
      setShowText('Name, subject, score are all required in order to add.')
    }
    else {
      //add to database
      try {
        await instance.post('/add', input)
        .then(res => {
          if (res.status === 200) {
            setShowText('Updating (' + capitalizeFst(input.name) + ', ' + capitalizeFst(input.subject) + ', ' + input.score + ')');
          }
          else if (res.status === 210) {
            setShowText('Adding (' + capitalizeFst(input.name) + ', ' + capitalizeFst(input.subject) + ', ' + input.score + ')');
          }
          initInputValue();
        })
      }
      catch (error) {
        if (error.response) {
          // Request made and server responded
          setShowText('Request made and server responded, some other problems occurred.');
          initInputValue();
        } else if (error.request) {
          // The request was made but no response was received
          setShowText('The request was made but no response was received, there are problems with the server.');
          initInputValue();
        }
      }
    }
    initInputState();
  }

  const handleQuery = async (e) => {
    initOutputState();
    let params = Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== null));
    params = Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== ''));
    try {
      await instance.get('/', {params: params})
      .then(res => {
        if (res.status === 200) { //found sth
          res.data.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            if (a.subject < b.subject) {
              return -1;
            }
            if (a.subject > b.subject) {
              return 1;
            }
            return 0;
          })

          for (var i = 0; i < res.data.length; i++) {
            const line = {...res.data[i]}
            setQueryResult(queryResult => [...queryResult, line])
          }
          initInputValue();
        }
        else if (res.status === 230) { //cannot find
          setShowText('Target: ' + res.data + 'not found')
          initInputValue();
        }
      })
    }
    catch (error) {
      if (error.response) {
        // Request made and server responded
        setShowText('Request made and server responded, some other problems occurred.');
        initInputValue();
      } else if (error.request) {
        // The request was made but no response was received
        setShowText('The request was made but no response was received, there are problems with the server.');
        initInputValue();
      }
    }
    initInputState();
  }

  return (
    <div className='scoreCardDB'>
        <TopBar handleClear={handleClear}/>
        <Form setName={setName} setSubject={setSubject} setScore={setScore} handleAdd={handleAdd} handleQuery={handleQuery}/>
        <ShowBox showText={showText} queryResult={queryResult}/>
    </div>
  );
}

export default ScoreCardDB;
