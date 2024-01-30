import React, { useState } from "react";
import GridSettings from "./GridSettings";
import Grid from "./Grid";

import "../styles/Pathfinder.css";

import { bfsAlgorithm } from "../algorithms/BFS";
import { dfsAlgorithm } from "../algorithms/DFS";

const Pathfinder = () => {
    const DEFAULT_ROWS = 20;
  const DEFAULT_COLS = 20;

  const createGrid = (rows, cols) => {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  };

  const [grid, setGrid] = useState(createGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [wallNodes, setWallNodes] = useState([]);
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);
  const [isSettingWall, setIsSettingWall] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [index, setIndex] = useState(0);

  const handleUpdateGrid = (rows, cols) => {
    const newGrid = createGrid(rows, cols);
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
    setWallNodes([]);
    setIsSettingStart(false);
    setIsSettingEnd(false);
    setIsSettingWall(false);
    setVisitedNodes([]);
    setIndex(0);
  };

  const handleSetStartButtonClick = () => {
    setIsSettingStart(!isSettingStart);
    setIsSettingEnd(false);
    setIsSettingWall(false);
  };

  const handleSetEndButtonClick = () => {
    setIsSettingEnd(!isSettingEnd);
    setIsSettingStart(false);
    setIsSettingWall(false);
  };

  const handleSetWallButtonClick = () => {
    setIsSettingWall(!isSettingWall);
    setIsSettingStart(false);
    setIsSettingEnd(false);
  };

  const clearGrid = () => {
    setGrid(prevGrid => {
      const updatedGrid = [...prevGrid];
      for(let row = 0; row < updatedGrid.length; row++) {
        for(let col = 0; col < updatedGrid[0].length; col++) {
          if(updatedGrid[row][col] === 2) {
            updatedGrid[row][col] = 0;
          }
          if(row === endNode.row && col === endNode.col) {
            updatedGrid[row][col] = 3;
          }
        }
      }
      return updatedGrid;
    });
  }

  const autoRunAnimated = (visitedNodes, index = 0) => {
    if(index < visitedNodes.length) {
      const node = visitedNodes[index];

      setGrid(prevGrid => {
        const updatedGrid = [...prevGrid];
        if(node.row !== startNode.row || node.col !== startNode.col) {
          updatedGrid[node.row][node.col] = 2;
        }
        return updatedGrid;
      });

      setTimeout(() => {
        autoRunAnimated(visitedNodes, index + 1);
      }, 500);
    }
  };



  const handleRunAlgorithm = (algorithm) => {
    if(startNode == null || endNode == null) {
      console.log('Start or end node not set');
      return;
    }

    clearGrid();

    var visitedNodes = [];
    switch(algorithm) {
      case 'bfs':
        visitedNodes = bfsAlgorithm(grid, startNode, endNode);
        autoRunAnimated(visitedNodes);
        break;
      case 'dfs':
        visitedNodes = dfsAlgorithm(grid, startNode, endNode);
        autoRunAnimated(visitedNodes);
        break;
      default:
    }
  };

  const handleNextStep = (algorithm) => {
    console.log(index);
    if(startNode == null || endNode == null) {
      console.log('Start or end node not set');
      return;
    }

    if(index === 0) {
      if(algorithm === 'bfs') {
        setVisitedNodes(bfsAlgorithm(grid, startNode, endNode));
      } else if(algorithm === 'dfs') {
        setVisitedNodes(dfsAlgorithm(grid, startNode, endNode));
      }
      setIndex(1);
    }

    animateNextStep();
  };

  const handlePreviousStep = () => {
    console.log(index);
    if(index > 0) {
      setIndex(index - 1);
      
      animatePreviousStep();
    }
  };

  const animatePreviousStep = () => { 
    const node = visitedNodes[index];

    setGrid(prevGrid => {
      const updatedGrid = [...prevGrid];
      if(node.row !== startNode.row || node.col !== startNode.col) {
        updatedGrid[node.row][node.col] = 0;
      }
      return updatedGrid; 
    });
  };

  const animateNextStep = () => {
    if(index < visitedNodes.length) {
      const node = visitedNodes[index];

      setGrid(prevGrid => {
        const updatedGrid = [...prevGrid];
        if(node.row !== startNode.row || node.col !== startNode.col) {
          updatedGrid[node.row][node.col] = 2;
        }
        return updatedGrid;
      });

      setIndex(index + 1);
    }
  };


  const handleSetNode = (row, col) => {
    if(isSettingStart) {
      if(startNode != null) {
        if(startNode.row === row && startNode.col === col) {
          setStartNode(null);
          grid[startNode.row][startNode.col] = 0;
        } else {
          grid[startNode.row][startNode.col] = 0;
          grid[row][col] = 5;
          setStartNode({ row, col });
        }
      } else {
        grid[row][col] = 5;
        setStartNode({ row, col });
      }
    } else if(isSettingEnd) {
      if(endNode != null) {
        if(endNode.row === row && endNode.col === col) {
          setEndNode(null);
          grid[endNode.row][endNode.col] = 0;
        } else {
          grid[endNode.row][endNode.col] = 0;
          grid[row][col] = 3;
          setEndNode({ row, col });
        }
      } else {
        grid[row][col] = 3;
        setEndNode({ row, col });
      } 
    } else if(isSettingWall) { 
      if(grid[row][col] === 1) {
        grid[row][col] = 0;
        setWallNodes(wallNodes.filter((node) => node.row !== row || node.col !== col));
      } else {
        grid[row][col] = 1;
        setWallNodes([...wallNodes, { row, col }]);
      }
      
      if(startNode != null) {
        if(row === startNode.row && col === startNode.col) {
          setStartNode(null);
        }
      } 
      
      if(endNode != null) {
        if(row === endNode.row && col === endNode.col) {
          setEndNode(null);
        }
      } 
      
    }
  };


  return (
    <div>
      <div className="filters">
        <GridSettings 
          onUpdateGridClick = {handleUpdateGrid} 
          onSetStartButtonClick={handleSetStartButtonClick} 
          onSetEndButtonClick={handleSetEndButtonClick} 
          onSetWallButtonClick={handleSetWallButtonClick}
          onRunAlgorithm={handleRunAlgorithm}
          onNextStepAlgorithm={handleNextStep}
          onPreviousStepAlgorithm={handlePreviousStep}
          isSettingStart={isSettingStart} 
          isSettingEnd={isSettingEnd}
          isSettingWall={isSettingWall}
        />
      </div>

      <div className="grid-display">
        <Grid grid={grid} setNode={handleSetNode} />

      </div>
    </div>
  );
};

export default Pathfinder;