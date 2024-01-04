
// eslint-disable-next-line react/prop-types
export const GameBoard = ({gameBoard}) => {

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {[...Array(10)].map((_, index) => (
            <th key={index}>{index + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(() => {
          const rows = [];
          for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
            const cells = [];
            for (let colIndex = 0; colIndex < 10; colIndex++) {
              cells.push(<td className="game-container__square" key={colIndex}>{gameBoard[rowIndex][colIndex]}</td>);
            }
            rows.push(
              <tr key={rowIndex}>
                <td>{String.fromCharCode(65 + rowIndex)}</td>
                {cells}
              </tr>
            );
          }
          return rows;
        })()}
      </tbody>
    </table>
  );
  
};
