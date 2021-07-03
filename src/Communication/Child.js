import { useDemoContext } from './Parent';

export function Child({ info, saIntamplatCeva, onSibling }) {
  const demoContext = useDemoContext();

  function handleClick() {
    saIntamplatCeva('Asta vine din copil');
  }
  function handleSibling() {
    demoContext.setContextState('Transmis din child via Context');
    onSibling('Asta vine din child');
  }
  return (
    <>
      <h1>Child Component</h1>
      {info}
      {demoContext.contextState}
      <button onClick={handleClick}>Comunica catre parinte</button>
      <button onClick={handleSibling}>Yo brother!</button>
    </>
  );
}
