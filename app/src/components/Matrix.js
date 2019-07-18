import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'
import './matrixSVG.css'
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';

import { Card, Button, CardTitle, CardText } from 'reactstrap';

import * as actionTypes from '.././store/actions';

class Matrix extends Component {

    onClick = (name_array, bool_param, query_param_array) => {

        if(bool_param) {

          this.props.updateQuery(name_array, query_param_array);
          this.props.toggleDisplay();
        }
    };

    /*

      For every hexagon:

        1) When clickable:

            For that specific query, determine how many entries are there in the database.

            For the 4 base types


        2) When not clickable:

              For all fifteen hexagons I need to calculate number of corresponding inputs.
              Basically like for function, check if entry has X in any of func1-3. look over every entry and maintain
              a boolean for all 4 parameters. and then increae counts depending on either of the 15 cases
              For function + material, check both similars
    */

    render() {




            const hexagonSize = { x: 12.5, y:  11.5 };

            let name_array = [];
            name_array[0] = 'Function';
            name_array[1] = 'BodyZones';
            name_array[2] = 'Fabrication';
            name_array[3] = 'Material'

            let bool_array = [];
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);

            if(this.props.selFunction !== '') {
                bool_array[0] = true;
                name_array[0] = this.props.selFunction;
              }

            if(this.props.selBodyZones !== '') {
                bool_array[1] = true;
                name_array[1] = this.props.selBodyZones;
            }

            if(this.props.selFabrication !== '') {
                bool_array[2] = true;
                name_array[2] = this.props.selFabrication;
            }

            if(this.props.selMaterial !== '') {
                bool_array[3] = true;
                name_array[3] = this.props.selMaterial;
            }

            let funcCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcCount = funcCount.length;

            if(bool_array[0]) {

              let curFuncCount = this.props.searchData.filter((item) => {
                return item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
              });
              funcCount = curFuncCount.length;
            }

            let fabCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabCount = fabCount.length;

            if(bool_array[2]) {

              let curFabCount = this.props.searchData.filter((item) => {
                return item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
              });
              fabCount = curFabCount.length;
            }

            let matCount = this.props.searchData.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matCount = matCount.length;

            if(bool_array[3]) {

              let curMatCount = this.props.searchData.filter((item) => {
                return item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
              });
              matCount = curMatCount.length;
            }

            let bodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            bodCount = bodCount.length;

            if(bool_array[1]) {

              let curBodCount = this.props.searchData.filter((item) => {
                return item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
              });
              bodCount = curBodCount.length;
            }

            /*
              For twos, take 2 bool arrays
            */

            let funcBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcBodCount = funcBodCount.length;

            if(bool_array[0] && bool_array[1]) {

              let curFuncBodCount = this.props.searchData.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              funcBodCount = curFuncBodCount.length;
            }



            let matBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matBodCount = matBodCount.length;

            if(bool_array[1] && bool_array[3]) {

              let curMatBodCount = this.props.searchData.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
              });
              matBodCount = curMatBodCount.length;
            }






            let fabBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabBodCount = fabBodCount.length;

            if(bool_array[1] && bool_array[2]) {

              let curFabBodCount = this.props.searchData.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
              });
              fabBodCount = curFabBodCount.length;
            }



            let fabFuncCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabFuncCount = fabFuncCount.length;

            if(bool_array[0] && bool_array[2]) {
              let curFabFuncCount = this.props.searchData.filter((item) => {
                return (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              fabFuncCount = curFabFuncCount.length;
            }

            let matFuncCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFuncCount = matFuncCount.length;

            if(bool_array[0] && bool_array[3]) {
              let curMatFuncCount = this.props.searchData.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              matFuncCount = curMatFuncCount.length;
            }



            let matFabCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFabCount = matFabCount.length;

            if(bool_array[2] && bool_array[3]) {
              let curMatFabCount = this.props.searchData.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
              });
              matFabCount = curMatFabCount.length;
            }




            let matFabFuncCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            matFabFuncCount = matFabFuncCount.length;

            if(bool_array[2] && bool_array[3] && bool_array[0]) {
              let curMatFabFuncCount = this.props.searchData.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                )
              });
              matFabFuncCount = curMatFabFuncCount.length;
            }


            let matFabBodCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            matFabBodCount = matFabBodCount.length;


            if(bool_array[2] && bool_array[3] && bool_array[1]) {
              let curMatFabBodCount = this.props.searchData.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              matFabBodCount = curMatFabBodCount.length;
            }



            let funcFabBodCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcFabBodCount = funcFabBodCount.length;

            if(bool_array[2] && bool_array[0] && bool_array[1]) {
              let curFuncFabBodCount = this.props.searchData.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });

              console.log(curFuncFabBodCount);
              funcFabBodCount = curFuncFabBodCount.length;
            }

            let funcMatBodCount = this.props.searchData.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcMatBodCount = funcMatBodCount.length;

            if(bool_array[3] && bool_array[0] && bool_array[1]) {
              let curFuncMatBodCount = this.props.searchData.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              funcMatBodCount = curFuncMatBodCount.length;
            }

            let allCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            allCount = allCount.length;

            if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
              let curAllCount = this.props.searchData.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                  (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))

              });
              allCount = curAllCount.length;
            }

            return (

             <div className="matrixBody">


             <div className="matrixSVG">
                        <HexGrid width={775} height={600} viewBox="-40 -45 90 90">
                        <Layout size={hexagonSize} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>

                                  <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}>

                                    {(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + allCount + ")"}</tspan></text>) :
                                     (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + allCount + ")"}</tspan></text>)}
                                 </Hexagon>

                                {/*
                                 <Hexagon q={0} r={2} s={0} stroke="green" fill="purple"/>
                                 <Hexagon q={0} r={-2} s={0} stroke="green" fill="purple"/>


                                 <Hexagon q={1} r={-3} s={0} stroke="white" fill="purple"/>
                                 <Hexagon q={1} r={2} s={0} stroke="white" fill="purple"/>

                                 <Hexagon q={-1} r={3} s={0} stroke="white" fill="purple"/>
                                 <Hexagon q={-1} r={-2} s={0} stroke="white" fill="purple"/>


                                 <Hexagon q={-2} r={-1} s={0} stroke="white" fill="purple"/>
                                 <Hexagon q={-2} r={3} s={0} stroke="white" fill="purple"/>

                                 <Hexagon q={2} r={1} s={0} stroke="white" fill="purple"/>
                                 <Hexagon q={2} r={-3} s={0} stroke="white" fill="purple"/>

                                <Hexagon q={-3} r={-1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-3} r={0} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-3} r={1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-3} r={2} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-3} r={3} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-3} r={4} s={0} stroke="white" fill="purple"/>

                                <Hexagon q={3} r={1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={3} r={0} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={3} r={-1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={3} r={-2} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={3} r={-3} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={3} r={-4} s={0} stroke="white" fill="purple"/>


                                <Hexagon q={-4} r={0} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-4} r={1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-4} r={2} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-4} r={3} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={-4} r={4} s={0} stroke="white" fill="purple"/>

                                <Hexagon q={4} r={0} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={4} r={-1} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={4} r={-2} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={4} r={-3} s={0} stroke="white" fill="purple"/>
                                <Hexagon q={4} r={-4} s={0} stroke="white" fill="purple"/>
                                */}


                                 <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}>

                                   {(bool_array[1] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text>) :
                                    (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text>)}
                                </Hexagon>

                                <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}>

                                  {(bool_array[0] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text>) :
                                   (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text>)}
                               </Hexagon>



                               <Hexagon onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={2} r={0} s={0}>
                                   <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabCount + ")"}</tspan></text>
                              </Hexagon>
                              <Hexagon onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matCount + ")"}</tspan></text>

                             </Hexagon>

                             <Hexagon onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={2} r={-1} s={0}>
                               {(bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text>) :
                                (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Fabrication</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text>)}

                            </Hexagon>

                            <Hexagon onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>

                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">{"(" + funcCount + ")"}</tspan></text>
                           </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-2} r={1} s={0}>

                             {(bool_array[0] && bool_array[1]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text>) :
                              (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text>)}
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={-2} r={2} s={0}>
                          <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + bodCount + ")"}</tspan></text>

                         </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={1} r={-1} s={0}>

                             {(bool_array[1] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text>) :
                              (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text>)}
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-1} r={0} s={0}>

                            {(bool_array[0] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text>) :
                             (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text>)}
                         </Hexagon>

                         <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={-1} s={0}>

                           {(bool_array[0] && bool_array[1] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>) :
                            (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>)}
                        </Hexagon>


                        <Hexagon q={-1} r={2} s={0}>
                          <Text>Contact Us</Text>
                       </Hexagon>

                       <Hexagon  q={1} r={1} s={0}>
                         <Text>Contribute</Text>
                      </Hexagon>

                      <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}>

                        {(bool_array[1] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text>) :
                         (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text>)}
                     </Hexagon>

                   <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}>

                       {(bool_array[0] && bool_array[1] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text>) :
                        (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text>)}
                    </Hexagon>

                    <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-2} s={0}>

                      {(bool_array[0] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabFuncCount + ")"}</tspan></text>) :
                       (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + matFabFuncCount + ")"}</tspan></text>)}
                    </Hexagon>


          </Layout>
        </HexGrid>


                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selFunction: state.selFunction,
        selBodyZones: state.selBodyZones,
        selFabrication: state.selFabrication,
        selMaterial: state.selMaterial,
        searchData: state.searchData,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
        updateQuery: (name_array, query_param) => dispatch({type: actionTypes.UPDATE_QUERY, names: name_array, params: query_param})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
