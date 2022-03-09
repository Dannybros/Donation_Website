import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3';
import "./d3.scss"
import { useTranslation } from 'react-i18next';

function D3Graph(props) {

    const {t} = useTranslation();

    const addValueOfSameKey=(array)=>{
        let holder = {};
        let result = [];

        array?.map((item) =>{

            const date = item.date.split('T')[0];

            (holder.hasOwnProperty(date))?

                holder[date] += item.amount 
            :
                holder[date]=item.amount
            
            return null;
        })

        for(var item in holder){
            result.push({date:new Date(item), amount:holder[item]})
        }

        return result;
    }

    const data = addValueOfSameKey(props.data)

    const d3Chart = useRef();
    const update = useRef(false);

    const height = 550
    const width = window.innerWidth* 0.7

    useEffect(() => {
        if(update.current){
            d3.selectAll('g').remove();
            d3.selectAll('path').remove();
        }else{update.current =true}

        const drawLine = ()=>{
            
            const margin = ({top: 20, right: 30, bottom: 80, left: 60})

            const svg = d3.select(d3Chart.current)
                .attr('width', width)
                .attr('height', height)

            // line
            const line = d3.line()
                .defined(d=>!isNaN(d.amount))
                .x(d=>x(d.date))
                .y(d=>y(d.amount))
            
            // x-range
            const x = d3.scaleUtc()
                .domain(d3.extent(data, d=>d.date))
                .range([margin.left, width - margin.right])
            
            // y-range
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d=>d.amount)]).nice()
                .range([height - margin.bottom, margin.top ])

            // x-axis
            svg.append('g')
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
                .style('color', 'black')
                .append('text')
                    .attr('class', 'x-lable')
                    .attr('y', margin.bottom-25)
                    .attr('x', width/2)
                    .attr('fill', 'black')
                    .text('Date')
            

            // y-axis
            svg.append('g')
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y))
                .style('color', 'black')
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr('font-size', 20)
                    .attr("font-weight", "bold")
                    .text('-$'))
                .append('text')
                    .attr('class', 'y-lable')
                    .attr('y', (height+margin.top + margin.bottom)/2)
                    .attr('x', -margin.left + 10)
                    .attr('fill', 'black')
                    .text('Amount')
                    // .style('writing-mode', 'vertical-lr')
            
            // append lines 
            svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr("stroke-width", 3)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", line);
        }
        
        drawLine();
    }, [data, width])

    return (
        <div id="d3Chart_box">
            <h1>{t('home.graph')}</h1>
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default D3Graph
