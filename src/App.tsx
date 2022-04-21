import { useState, useMemo, useCallback, CSSProperties } from "react";
import "./App.css";

type ExampleId =
  | "Unmemoized"
  | "Memoized Styles"
  | "Memoized Styles and Callbacks";

let _onClickA: any = undefined;
let _onClickB: any = undefined;
let _aStyle: any = undefined;
let _bStyle: any = undefined;

function logChanges(onClickA: any, onClickB: any, aStyle: any, bStyle: any) {
  if (_onClickA !== onClickA) {
    console.log(`onClickA did not ===`);
  }
  if (_onClickB !== onClickB) {
    console.log(`onClickB did not ===`);
  }
  if (_aStyle !== aStyle) {
    console.log(`aStyle did not ===`);
  }
  if (_bStyle !== bStyle) {
    console.log(`bStyle did not ===`);
  }

  _onClickA = onClickA;
  _onClickB = onClickB;
  _aStyle = aStyle;
  _bStyle = bStyle;
}

export function App() {
  const [exampleId, setExampleId] = useState<ExampleId>("Unmemoized");

  const switchExample = () => {
    setExampleId(
      exampleId === "Unmemoized"
        ? "Memoized Styles"
        : exampleId === "Memoized Styles"
        ? "Memoized Styles and Callbacks"
        : "Unmemoized"
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p id={"header-title"}>{exampleId}</p>
        <Button label={"Switch examples"} onClick={switchExample} />
      </header>
      {exampleId === "Unmemoized" ? (
        <DemoUnmemoized />
      ) : exampleId === "Memoized Styles" ? (
        <DemoMemoizedStyles />
      ) : (
        <DemoMemoizedStylesAndCallbacks />
      )}
    </div>
  );
}

function DemoUnmemoized() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const onClickA = () => {
    setA((a + 16) % 360);
  };

  const onClickB = () => {
    setB((b + a) % 360);
  };

  const aStyle = { backgroundColor: `hsl(${a}, 80%, 50%)` };

  const bStyle = { backgroundColor: `hsl(${b}, 80%, 50%)` };

  logChanges(onClickA, onClickB, aStyle, bStyle);

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <Circle name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <Button
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <Circle name={"B"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <Button name={"B"} label={"Increment hue B by A"} onClick={onClickB} />
      </div>
    </div>
  );
}

function DemoMemoizedStyles() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const onClickA = () => {
    setA((a + 16) % 360);
  };

  const onClickB = () => {
    setB((b + a) % 360);
  };

  const aStyle = useMemo(() => {
    return { backgroundColor: `hsl(${a}, 80%, 50%)` };
  }, [a]);

  const bStyle = useMemo(() => {
    return { backgroundColor: `hsl(${b}, 80%, 50%)` };
  }, [b]);

  logChanges(onClickA, onClickB, aStyle, bStyle);

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <Circle name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <Button
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <Circle name={"A"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <Button name={"B"} label={"Increment hue B by A"} onClick={onClickB} />
      </div>
    </div>
  );
}

function DemoMemoizedStylesAndCallbacks() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const onClickA = useCallback(() => {
    setA((a + 16) % 360);
  }, [a]);

  const onClickB = useCallback(() => {
    setB((b + a) % 360);
  }, [a, b]);

  const aStyle = useMemo(() => {
    return { backgroundColor: `hsl(${a}, 80%, 50%)` };
  }, [a]);

  const bStyle = useMemo(() => {
    return { backgroundColor: `hsl(${b}, 80%, 50%)` };
  }, [b]);

  logChanges(onClickA, onClickB, aStyle, bStyle);

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <Circle name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <Button
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <Circle name={"A"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <Button name={"B"} label={"Increment hue B by A"} onClick={onClickB} />
      </div>
    </div>
  );
}

function Button(_: { name?: string; label: string; onClick: () => void }) {
  return (
    <div className={"button"} onClick={_.onClick}>
      {_.label}
    </div>
  );
}

function Circle(_: { name: string; style: CSSProperties }) {
  return <div className={"circle"} style={_.style}></div>;
}

export default App;
