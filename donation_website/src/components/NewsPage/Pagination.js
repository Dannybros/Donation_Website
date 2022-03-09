import React, {useState} from 'react';
import './pagination.css'
import { useTranslation } from 'react-i18next';

const Pagination=({data, RenderComponent, pageLimit, dataLimit})=>{

    const [totalpages] =  useState(Math.ceil(data.length/dataLimit));
    const [currentPage, setCurrentPage]= useState(1);

    const {t} = useTranslation();

    function goToNextPage(){
        setCurrentPage((page)=>page + 1);
    }

    function goToPrevPage(){    
        setCurrentPage((page)=>page-1);
    }

    function changePage(event){
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

        // Data to display in specific page
    const getPaginationData=()=>{
        const startIndex = (currentPage - 1) * dataLimit;
        const endIndex = Math.min(startIndex + dataLimit, data.length);

        return data.slice(startIndex, endIndex);
    }

        // Algorithm to show 5 page numbers
    const getPager=()=>{

        var startPage, endPage;

        if(totalpages<=5){
            startPage = 1;
            endPage = totalpages;
        }else{
            if(currentPage <=3){
                startPage=1;
                endPage =5;
            }
            else if(currentPage + 2 >= totalpages){
                startPage = totalpages-4;
                endPage = totalpages;
            }
            else{
                startPage = currentPage - 2
                endPage = currentPage +2
            }
        }

        var pager = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        return pager
    }

    function goToLastPage(){
        setCurrentPage(totalpages)
    }
    function goToFirstPage(){
        setCurrentPage(1)
    }
    
    return(
        <div>
            <div className="pagination">
                {/* previous button */}
                 <button
                    onClick={goToFirstPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                   {t('News.pagination.first')}
                </button>
                
                <button
                    onClick={goToPrevPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                     {t('News.pagination.prev')}
                </button>

                {/* show page numbers */}
                {getPager().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                    <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === totalpages ? 'disabled' : ''}`}
                >
                     {t('News.pagination.next')}
                </button>
                <button
                    onClick={goToLastPage}
                    className={`next ${currentPage === totalpages ? 'disabled' : ''}`}
                >
                     {t('News.pagination.last')}
                </button>
            </div>

            
            <div className="dataContainer">
                {getPaginationData().map((d, idx) => (
                    <RenderComponent key={idx} data={d} />
                ))}
            </div>
        </div>
    )
}

export default Pagination
