import { useDemoContext } from './Parent';

export function Sibling({ data }) {
  const { contextState, setContextState } = useDemoContext();

  return (
    <>
      <h1>Sibling Component</h1>
      Data from other child: {data}
      Data from child via context: {contextState}
      <button onClick={() => setContextState('From sibling via context')}>
        Send to child
      </button>
    </>
  );
}
