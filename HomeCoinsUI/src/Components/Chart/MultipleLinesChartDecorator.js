import React from "react";
import { Circle, Svg } from "react-native-svg";

const min = 1;
const max = 10000000;

const uniqueKey = (index) => {
  return Math.floor(Math.random() * (max - min + 1)) + min + index;
};

export const MultipleLinesChartDecorator = (props) => {
  const { x, y, combinedData } = props;

  return (
    <>
      {combinedData &&
        combinedData.map((item, index) => {
          return (
            <Svg key={uniqueKey(index)}>
              {item.data.map((value, index) => (
                <Circle
                  key={uniqueKey(index)}
                  cx={x(index)}
                  cy={y(value)}
                  r={2.5}
                  stroke={'rgb(0, 0, 0)'}
                  fill={'white'}
                />
              ))}
            </Svg>
          );
        })}
    </>
  );
};
