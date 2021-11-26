import { LoremIpsum } from 'lorem-ipsum';
import { useEffect,useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import Number from './components/Controls/Number';
import Select from './components/Controls/Select';
import Output from './components/Output';

function App() {
  const [paras,setParas] = useState(4)
  // const [sentence,setSentence] = useState(4)
  const [html,setHtml] = useState(true)
  const [text,setText] = useState('')
  const [copied,setCopied] = useState(false)

  useEffect(() => {
    getSampleText()
    return () => {

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[html,paras])

  useEffect(() => {
    const time = setTimeout(() => {
      setCopied(false)
    },3000);
    return () => {
      clearTimeout(time)
    }
  },[copied])

  const getSampleText = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      },
    },html ? "html" : 'plain'
    );

    setText(lorem.formatString(lorem.generateParagraphs(paras)).replace(/^<p>/,'').replace(/<\/p>$/,''))
  }

  const showHtml = (show) => {
    setHtml(show === 'true')
  }

  const handleParas = (val) => {
    const parsed = parseInt(val,10)
    if (!isNaN(parsed)) {
      if (paras > 50) setParas(50)
      else if (paras < 1) setParas(1)
      else setParas(parsed)
    }
  }

  // const handleSentence = (val) => {
  //   setSentence(val)
  // }

  return (
    <div className='App container'>
      <h1>ReactJS Text Generator</h1>
      <hr />
      <form className="row mb-5">
        <div className="col-md-3 text-start">
          <label htmlFor='paras' className='form-label fw-bold'>Paragraphs:</label>
          <Number id='paras' value={paras} onChange={handleParas} min={1} max={50} />
        </div>
        {/* <div className="col-md-3 text-start">
          <label htmlFor='sentences' className='form-label fw-bold'>Sentences:</label>
          <Number id='sentences' value={sentence} onChange={handleSentence} min={1} max={50} />
        </div> */}
        <div className="col-lg-2 col-sm-3 text-start">
          <label htmlFor='html' className='form-label fw-bold'>Include HTML:</label>
          <Select id='html' value={html} onChange={showHtml} />
        </div>
        <div className="ms-auto mt-auto col me-0 text-end">
          <CopyToClipboard
            onCopy={() => setCopied(true)}
            text={text}
          ><button type='button' className='btn btn-outline-primary text-nowrap'>Copy to clipboard</button></CopyToClipboard>
        </div>
      </form>
      {copied && (<div className="alert alert-success">
        Text copied to clipboard!
      </div>)}
      <Output
        value={text}
      />
    </div>
  );
}

export default App;
