import { useState, useMemo, useCallback, CSSProperties, memo } from "react";
import "./App.css";

type ExampleId =
  | "Unmemoized props"
  | "Memoized style props"
  | "Memoized style and onPress props";

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
  const [exampleId, setExampleId] = useState<ExampleId>("Unmemoized props");
  const [memoizeComponents, setMemoizeComponents] = useState(false);

  const switchExample = useCallback(() => {
    setExampleId(
      exampleId === "Unmemoized props"
        ? "Memoized style props"
        : exampleId === "Memoized style props"
        ? "Memoized style and onPress props"
        : "Unmemoized props"
    );
  }, [exampleId]);

  const toggleMemoizedComponents = useCallback(() => {
    setMemoizeComponents(!memoizeComponents);
  }, [memoizeComponents]);

  return (
    <div className="App">
      <header className="App-header">
        <p id={"header-title"}>Demo</p>
        <Button label={exampleId} onClick={switchExample} />
        <Button
          label={
            memoizeComponents
              ? "Memoized Circle and Button components"
              : "Unmemoized Circle and Button components"
          }
          onClick={toggleMemoizedComponents}
        />
      </header>
      {exampleId === "Unmemoized props" ? (
        <DemoUnmemoized memoizeComponents={memoizeComponents} />
      ) : exampleId === "Memoized style props" ? (
        <DemoMemoizedStyles memoizeComponents={memoizeComponents} />
      ) : (
        <DemoMemoizedStylesAndCallbacks memoizeComponents={memoizeComponents} />
      )}
    </div>
  );
}

function DemoUnmemoized(_: { memoizeComponents: boolean }) {
  const [a, setA] = useState(16);
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

  const CircleComponent = _.memoizeComponents ? MemoizedCircle : Circle;
  const ButtonComponent = _.memoizeComponents ? MemoizedButton : Button;

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <CircleComponent name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <ButtonComponent
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <CircleComponent name={"B"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <ButtonComponent
          name={"B"}
          label={"Increment hue B by A"}
          onClick={onClickB}
        />
      </div>
    </div>
  );
}

function DemoMemoizedStyles(_: { memoizeComponents: boolean }) {
  const [a, setA] = useState(16);
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

  const CircleComponent = _.memoizeComponents ? MemoizedCircle : Circle;
  const ButtonComponent = _.memoizeComponents ? MemoizedButton : Button;

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <CircleComponent name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <ButtonComponent
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <CircleComponent name={"A"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <ButtonComponent
          name={"B"}
          label={"Increment hue B by A"}
          onClick={onClickB}
        />
      </div>
    </div>
  );
}

function DemoMemoizedStylesAndCallbacks(_: { memoizeComponents: boolean }) {
  const [a, setA] = useState(16);
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

  const CircleComponent = _.memoizeComponents ? MemoizedCircle : Circle;
  const ButtonComponent = _.memoizeComponents ? MemoizedButton : Button;

  return (
    <div className={"examplesRow"}>
      <div className="flexColumn">
        <CircleComponent name={"A"} style={aStyle} />
        <div className="valueText">A = {a}°</div>
        <ButtonComponent
          name={"A"}
          label={"Increment hue A by 16°"}
          onClick={onClickA}
        />
      </div>
      <div className="flexColumn">
        <CircleComponent name={"A"} style={bStyle} />
        <div className="valueText">B = {b}°</div>
        <ButtonComponent
          name={"B"}
          label={"Increment hue B by A"}
          onClick={onClickB}
        />
      </div>
    </div>
  );
}

function Button(_: { name?: string; label: string; onClick: () => void }) {
  return (
    <div
      id={_.name ? undefined : "headerButton"}
      className={"button"}
      onClick={_.onClick}
    >
      {_.label}
    </div>
  );
}

function Circle(_: { name: string; style: CSSProperties }) {
  return <div className={"circle"} style={_.style}></div>;
}

const MemoizedButton = memo(Button);
const MemoizedCircle = memo(Circle);

export default App;
