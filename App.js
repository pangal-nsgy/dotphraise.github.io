import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      output: '',
      prompt: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'neurosurgeon') {
      this.setState({ neurosurgeon: event.target.value });
    } else if (event.target.name === 'consultNote') {
      this.setState({ consultNote: event.target.value });
    } else {
      this.setState({ input: event.target.value });
    }
  }


handleSubmit(event) {
  const neurosurgeon = document.getElementById('neurosurgeon').value;
  const consultNote = document.getElementById('consultNote').value;
  const prompt = `I am a ${neurosurgeon}, writing a ${consultNote}.
  Please write a detailed note in the standard format of a ${consultNote}. Use over 300 words. Use relevant line breaks and bullets as needed. 
  Be structured and detailed. Use information from the following case${this.state.input}`;

  axios
    .post('https://api.openai.com/v1/completions', {
      prompt: prompt,
      model: 'text-davinci-003',
      max_tokens: 2000,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    })
    .then(response => {
      this.setState({ output: response.data.choices[0].text, prompt: prompt });
    })
    .catch(error => {
      console.log(error);
    });
  event.preventDefault();
}

  
  render() {
    return (
      <div className="App">
        <h1>dotphrAIse</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="specialty">
            <input type="text1" placeholder="e.g. neurosurgeon" id="neurosurgeon" />
          </div>
          <div className="notetype">
            <input type="text1" placeholder="e.g. consult note" id="consultNote" />
          </div>
          <div className="main-input">
            <input type="text3" placeholder="Type a prompt for GPT-3" value={this.state.input} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
            {this.state.output && (
              <div>
                <p className="prompt-box">{this.state.prompt}</p>
                <div className="output-box">
                  <p>{this.state.output}</p>
              </div>
            </div>
            )}
        </form>
      </div>
    );
  }
  
}

export default App;


