import { newNGenerations } from "./ca-engine.ts";
import React, { Props, useState } from "npm:react";
import { Box, render, Text, useInput } from "npm:ink";

const Generation = ({ cells }: Props) => (
  <Text>
    {
      cells
      .map((e: boolean) => e ? "#" : " ")
      .reduce((acc: string, e: string) => acc + e, "")
    }
  </Text>
);

const GenerationBox = ({ rule, length, cells }: Props) => {
  const generations: boolean[][] = newNGenerations(length, cells, rule);
  return generations.map((elem, index) => (
    <Generation cells={elem} key={index} />
  ));
};

const Indicator = ( {index}: Props ) => (
  <Text>{".".padStart(index + 1)}</Text>
);

const Root = () => {
  const { columns, rows } = Deno.consoleSize();
  const [selectedCell, setSelectedCell] = useState(0);
  const [initCells, setInitCells] = useState(
    [
      true,
      ...Array(columns - 1).fill(false),
    ],
  );
  const [rules, setRules] = useState(126);

  useInput((input, key) => {
    if (key.escape || input == "q")
      Deno.exit();

    switch(input) {
      case " ":
        setInitCells(initCells.with(selectedCell, !initCells.at(selectedCell)));
        break;
      case "h":
        setSelectedCell(selectedCell - 1);
        break;
      case "H":
        setSelectedCell(selectedCell - 5);
        break;
      case "L":
        setSelectedCell(selectedCell + 5)
        break;
      case "l":
        setSelectedCell(selectedCell + 1);
        break;
    }
  });

  return (
    <Box heigth="100%" width="100%" flexWrap="wrap">
      <Indicator index={selectedCell} />
      <Generation
        cells={initCells}
      />
      <GenerationBox
        rule={rules}
        length={rows - 3}
        cells={initCells}
      />
    </Box>
  );
};

render(<Root />);
