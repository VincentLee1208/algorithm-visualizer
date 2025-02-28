import React, { useState } from 'react';
import '../styles/GridSettings.css';

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 20;

const GridSettings = ({ onUpdateGridClick, onSetStartButtonClick, onSetEndButtonClick, onSetWallButtonClick, onRunAlgorithm, onNextStepAlgorithm, onPreviousStepAlgorithm, isSettingStart, isSettingEnd, isSettingWall }) => {
    const [rows, setRows] = useState(DEFAULT_ROWS);
    const [cols, setCols] = useState(DEFAULT_COLS);
    const [algorithm, setAlgorithm] = useState('bfs');

    const handleUpdateGrid = () => {
        onUpdateGridClick(rows, cols);
    };

    
    const handleSetStartButtonClick = () => {
        onSetStartButtonClick();
    };

    const handleSetEndButtonClick = () => {
        onSetEndButtonClick();
    };

    const handleSetWallButtonClick = () => {
        onSetWallButtonClick();
    };
    
    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value);
    };

    const handleRunAlgorithm = () => {
        onRunAlgorithm(algorithm);
    };

    const handleNextStep = () => {
        onNextStepAlgorithm(algorithm);
    };

    const handlePreviousStep = () => {
        onPreviousStepAlgorithm();
    }

    return (
        <div>
            <div className='grid-setting-container'>
                <label>
                    Rows:
                    <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
                </label>
                <label>
                    Cols:
                    <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} />
                </label>
                <button onClick={handleUpdateGrid}>Reset Grid</button>
            </div>
                
            <div className='grid-button-container'>
                <button onClick={handleSetStartButtonClick} style={{ backgroundColor: isSettingStart ? '#555' : '#007bff', color: '#fff' }}>
                    {isSettingStart ? 'Setting Start Node' : 'Set Start Node'}
                </button>

                <button onClick={handleSetEndButtonClick} style={{ backgroundColor: isSettingEnd ? '#555' : '#007bff', color: '#fff' }}>
                    {isSettingEnd ? 'Setting End Node' : 'Set End Node'}
                </button>

                <button onClick={handleSetWallButtonClick} style={{ backgroundColor: isSettingWall ? '#555' : '#007bff', color: '#fff' }}>
                    {isSettingWall ? 'Setting Wall Node' : 'Set Wall Node'}
                </button>
            </div>

            <div className='grid-algorithm-container'>
                <label>
                    Algorithm:
                    <select value={algorithm} onChange={handleAlgorithmChange}>
                        <option value="bfs">Breadth First Search</option>
                        <option value="dfs">Depth First Search</option>
                        <option value="dijkstra">Dijkstra's Algorithm</option>
                    </select>
                </label>
            </div>

            <div className='grid-start-button-container'>
                <button onClick={handleRunAlgorithm}>
                    Run
                </button>
            </div>
            <div className="grid-step-button-container"> 
                <button onClick={() => handleNextStep()}>Next Step</button>
                <button onClick={() => handlePreviousStep()}>Previous Step</button>
            </div>
        </div>
    );
};

export default GridSettings;