import React from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort.js";
import "./SortingVisualizer.css";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = "cyan";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 100
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const randomArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      randomArray.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array: randomArray });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 100) / this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, (i * 100) / this.state.animationSpeed);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  sliderHandler = (event, newValue) => {
    this.setState({ animationSpeed: newValue });
  };

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="header-container">
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.resetArray()}
          >
            Generate New Array
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.mergeSort()}
          >
            Merge Sort
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.quickSort()}
          >
            Quick Sort TODO
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.heapSort()}
          >
            Heap Sort TODO
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort TODO
          </Button>
          <Slider
            className="speedSlider"
            value={this.animationSpeed}
            onChange={this.sliderHandler}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            min={1}
            max={100}
          />
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
