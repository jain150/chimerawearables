import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'
import './matrixSVG.css'
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';

import { Card, Button, CardTitle, CardText } from 'reactstrap';

import * as actionTypes from '.././store/actions';

class Matrix extends Component {

  /*

    On Click,

    Define action to switch to search Display.
    Define action that takes in boolean array and name array and stores them in redux state.


    Now, in searchDisplay, handle the filtering and do mapStateToProps

  */

    onClick = (name_array, bool_param, query_param_array) => {


        if(bool_param) {

          this.props.toggleDisplay();
          this.props.updateQuery(name_array, query_param_array);
        }

        /*
          call searchUpdate

          if search if all of param array contains true
        */
    };

    lol = () => {
      console.log("LOL");
    }

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


            return (

             <div className="matrixBody">


          <div className="matrixSVG">
                        <HexGrid width={900} height={650} viewBox="-40 -42 90 90">
                        <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>

                                  <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}>
                                    <Text>{(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("All Correlations")}</Text>
                                 </Hexagon>

                                 <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}>
                                   <Text>{(bool_array[1] && bool_array[2]) ? (name_array[1] + "+" + name_array[2]) : ("BodyZones + Fabrication")}</Text>
                                </Hexagon>

                                <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}>
                                  <Text>{(bool_array[0] && bool_array[3]) ? (name_array[0] + "+" + name_array[3]) : ("Function + Material")}</Text>
                               </Hexagon>

                               <Hexagon onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={2} r={0} s={0}>
                                 <Text>{name_array[2]}</Text>
                              </Hexagon>
                              <Hexagon onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                                <Text>{name_array[3]}</Text>
                             </Hexagon>

                             <Hexagon onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={2} r={-1} s={0}>
                               <Text>{(bool_array[2] && bool_array[3]) ? (name_array[2] + "+" + name_array[3]) : ("Fabrication + Material")}</Text>
                            </Hexagon>

                            <Hexagon onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>
                              <Text>{name_array[0]}</Text>
                           </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-2} r={1} s={0}>
                             <Text>{(bool_array[0] && bool_array[1]) ? (name_array[0] + "+" + name_array[1]) : ("Function + Body Zones")}</Text>
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={-2} r={2} s={0}>
                            <Text>{name_array[1]}</Text>
                         </Hexagon>

                           <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={1} r={-1} s={0}>
                             <Text>{(bool_array[1] && bool_array[3]) ? (name_array[1] + "+" + name_array[3]) : ("BodyZones + Material")}</Text>
                          </Hexagon>

                          <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-1} r={0} s={0}>
                            <Text>{(bool_array[0] && bool_array[2]) ? (name_array[0] + "+" + name_array[2]) : ("Function + Fabrication")}</Text>
                         </Hexagon>

                         <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={-1} s={0}>
                           <Text>{(bool_array[0] && bool_array[1] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[3]) : ("Function + BodyZones + Material")}</Text>
                        </Hexagon>


                        <Hexagon q={-1} r={2} s={0}>
                          <Text>Contact Us</Text>
                       </Hexagon>

                       <Hexagon  q={1} r={1} s={0}>
                         <Text>MiniSearch</Text>
                      </Hexagon>

                      <Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['Function', 'Material', 'Fabrication'])} q={1} r={0} s={0}>
                        <Text>{(bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("BodyZones + Fabrication + Material")}</Text>
                     </Hexagon>

                   <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}>
                       <Text>{(bool_array[0] && bool_array[1] && bool_array[2]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2]) : ("Function + BodyZones + Fabrication")}</Text>
                    </Hexagon>

                    <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-2} s={0}>
                      <Text>{(bool_array[0] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[2] + "+" + name_array[3]) : ("Function + Fabrication + Material")}</Text>
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
