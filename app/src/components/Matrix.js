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

          this.props.toggleDisplay();
          this.props.updateQuery(name_array, query_param_array);
        }
    };

    /*

      For every hexagon:

        1) When clickable:

            For that specific query, determine how many entries are there in the database.


        2) When not clickable:

              For all fifteen hexagons I need to calculate number of corresponding inputs.
              Basically like for function, check if entry has X in any of func1-3. look over every entry and maintain
              a boolean for all 4 parameters. and then increae counts depending on either of the 15 cases
              For function + material, check both similars
    */

    render() {


            let funcCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcCount = funcCount.length;

            let fabCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabCount = fabCount.length;

            let matCount = this.props.searchData.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matCount = matCount.length;

            let bodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            bodCount = bodCount.length;

            let funcBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcBodCount = funcBodCount.length;

            let matBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matBodCount = matBodCount.length;

            let fabBodCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabBodCount = fabBodCount.length;

            let fabFuncCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabFuncCount = fabFuncCount.length;

            let matFuncCount = this.props.searchData.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFuncCount = matFuncCount.length;

            let matFabCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFabCount = matFabCount.length;

            let matFabFuncCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });

            matFabFuncCount = matFabFuncCount.length;

            let matFabBodCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });

            matFabBodCount = matFabBodCount.length;

            let funcFabBodCount = this.props.searchData.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });

            funcFabBodCount = funcFabBodCount.length;

            let funcMatBodCount = this.props.searchData.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });

            funcMatBodCount = funcMatBodCount.length;

            let allCount = this.props.searchData.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            allCount = allCount.length;

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


            return (

             <div className="matrixBody">


             <div className="matrixSVG">
                        <HexGrid width={775} height={600} viewBox="-40 -45 90 90">
                        <Layout size={hexagonSize} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>

                                  <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}>

                                    {(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
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

                                   {(bool_array[1] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan></text>) :
                                    (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text>)}
                                </Hexagon>

                                <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}>

                                  {(bool_array[0] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
                                   (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text>)}
                               </Hexagon>



                               <Hexagon onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={2} r={0} s={0}>
                                   <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabCount + ")"}</tspan></text>
                              </Hexagon>
                              <Hexagon onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matCount + ")"}</tspan></text>

                             </Hexagon>

                             <Hexagon onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={2} r={-1} s={0}>
                               {(bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
                                (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Fabrication</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text>)}

                            </Hexagon>

                            <Hexagon onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>

                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">{"(" + funcCount + ")"}</tspan></text>
                           </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-2} r={1} s={0}>

                             {(bool_array[0] && bool_array[1]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan></text>) :
                              (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text>)}
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={-2} r={2} s={0}>
                          <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + bodCount + ")"}</tspan></text>

                         </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={1} r={-1} s={0}>

                             {(bool_array[1] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
                              (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text>)}
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-1} r={0} s={0}>

                            {(bool_array[0] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan></text>) :
                             (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text>)}
                         </Hexagon>

                         <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={-1} s={0}>

                           {(bool_array[0] && bool_array[1] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
                            (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>)}
                        </Hexagon>


                        <Hexagon q={-1} r={2} s={0}>
                          <Text>Contact Us</Text>
                       </Hexagon>

                       <Hexagon  q={1} r={1} s={0}>
                         <Text>Contribute</Text>
                      </Hexagon>

                      <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}>

                        {(bool_array[1] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
                         (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text>)}
                     </Hexagon>

                   <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}>

                       {(bool_array[0] && bool_array[1] && bool_array[2]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan></text>) :
                        (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text>)}
                    </Hexagon>

                    <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-2} s={0}>

                      {(bool_array[0] && bool_array[2] && bool_array[3]) ? (<text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">{name_array[0]}</tspan><tspan x="0" dy="1.2em">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">+ {name_array[3]}</tspan></text>) :
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
