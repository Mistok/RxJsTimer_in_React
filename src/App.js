import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";




function App() {

   let [isRunning, setIsRunning] = useState(false)

   let [currentTimer, setCurrentTimer] = useState(0)


    useEffect(() => {
        const unsubscribe$ = new Subject();
        interval(300).pipe(
                takeUntil(unsubscribe$)
        ).subscribe(
            () =>
                isRunning
                    ? setCurrentTimer(val => val + 1000) //time in milliseconds
                    : null

        )
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        }
    }, [isRunning])
    let startHandler = () => {
        setIsRunning(true)

    }
    let pauseHandler = () => {
       setIsRunning(false)
    }
    let stopHandler = () => {
       setIsRunning(false)
       setCurrentTimer(0)
    }

    let resetHandler = () => {
       setCurrentTimer(0)
    }

  return (
    <div className="App">
      <header className="App-header">
        testing task timer
      </header>
        <div className="time_desk">

            <span>
                { new Date(currentTimer).toISOString().slice(11, 19) }
            </span>
        </div>

        <div>
            {
                isRunning
                    ? <button className="btn btn-primary " onClick={pauseHandler}>pause</button>
                    : <button className="btn btn-primary " onClick={startHandler}>start</button>
            }
            <button className="btn btn-primary" onClick={stopHandler}>stop</button>
            <button className="btn btn-primary" onClick={resetHandler}>reset</button>
        </div>
    </div>
  );
}

export default App;
