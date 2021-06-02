import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import Text from './text'

function ShowBox ({showText, queryResult}) {
  const [pageNum, setPageNum] = useState(0);

  const linesPerPage = 5;
  const pagesVisited = pageNum * linesPerPage;

  const capitalizeFst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const showResult = queryResult
      .slice(pagesVisited, pagesVisited + linesPerPage)
      .map(line => {
        return (
          <tr>
            <td>{capitalizeFst(line.name)}</td>
            <td>{capitalizeFst(line.subject)}</td>
            <td>{line.score}</td>
          </tr>
        );
      });

  const pageCnt = Math.ceil(queryResult.length / linesPerPage);
  const changePage = ({selected}) => {
    setPageNum(selected);
  };

  const showContent = () => {
    if (queryResult.length === 0) {
      return (
        <Text text={showText} />
      )
    }
    else {
      if (queryResult.length > 5) {
        return (
          <div className='queryResult-wrapper'>
            <table>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Score</th>
            </tr>
              {showResult}
            </table>
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCnt}
            onPageChange={changePage}
            containerClassName={"pagination-buttons"}
            pageClassName={'page-button'}
            previousClassName={'next-button'}
            nextClassName={'next-button'}
            disabledClassName={"pagination-disabled"}
            />
          </div>
        )
      }
      else {
        return (
          <div className='queryResult-wrapper'>
            <table>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Score</th>
            </tr>
              {showResult}
            </table>
          </div>
        )
      }
    }
  }

  return (
    <div className='showBox-text'>
        {showContent()}
    </div>
  );
};

export default ShowBox;
