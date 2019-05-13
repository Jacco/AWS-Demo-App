import React, { useState } from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { API, Auth } from 'aws-amplify'; 
import logo from './logo.svg';
import './App.css';

awsmobile.aws_cloud_logic_custom[0].custom_header = async() => {
  return { Authorization: (await Auth.currentSession()).idToken.jwtToken }  
}

Amplify.configure(awsmobile);

function App() {
  const [file, setFile] = useState(null);
  const uploadPhoto = async(e) => {
    e.preventDefault();

    const readFile = function(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                resolve(reader.result);
            };
            reader.onerror = reader.onabort = reject;
            reader.readAsDataURL(file);
        });
    }

    let data = await readFile(file)

    await API.post('photo', '/photo', {
      headers: {},
      response: true,
      body: JSON.stringify({
        photo: data
      })
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <form onSubmit={uploadPhoto}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default withAuthenticator(App, true);
