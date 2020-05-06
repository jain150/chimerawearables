import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'
import './matrixSVG.css'
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ContributePage from './ContributePage';
import './bodyZones.css'
import Tabletop from 'tabletop';

import { Card, Button, CardTitle, CardText } from 'reactstrap';

import * as actionTypes from '.././store/actions';

class Matrix extends Component {

  constructor(props) {

    super(props);

      this.state = {
        zone: 'none',
        modal: false,
        modal2: false,
        modal3: false,
        nameitems: [],
      };
}
    onClick = (name_array, bool_param, query_param_array) => {

        if(bool_param) {

          this.props.updateQuery(name_array, query_param_array);
          this.props.toggleDisplay();
        }
    };
    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  
    toggle2 = () => {
      this.setState(prevState => ({
        modal2: !prevState.modal2
      }));
    }
    toggle3 = () => {
      this.setState(prevState => ({
        modal3: !prevState.modal3
      }));
    }
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
      const namefinalitems = [];
      Tabletop.init({
        key: '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc',
        callback: googleData => {
  
          let temp = googleData["Sheet1"].elements;
          let names = [];
         {/*} for(let i = 0; i < 2; i++) {
            alert(temp[i]["AUTHORS"]);
            
           }*/}
           for(let i = 0; i < temp.length; i++) {
            names.push("<h4>&nbsp;&nbsp;&nbsp;&nbsp;"+temp[i]["Reference Name"] +"</h4>"+ "<h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            + temp[i]["AUTHORS"] + "</h6>")
          }

          this.setState({nameitems: names,})
          
        },
        simpleSheet: false
      })
            let filterArr = this.props.searchData;
            for (const [index, value] of this.state.nameitems.entries()) {
              namefinalitems.push(<li style={{padding: "5px 5px"}} key={index}><span dangerouslySetInnerHTML={{__html:value}}></span></li>)
            }
            if(this.props.filter) {

              filterArr = filterArr.filter(this.filterYear);
              filterArr = filterArr.filter(this.filterVenue);
              filterArr = filterArr.filter(this.filterSource);
            }

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

            let funcCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcCount = funcCount.length;

            if(bool_array[0] && !name_array[0].toLowerCase().trim().includes('all functions')) {

              let curFuncCount = filterArr.filter((item) => {
                return item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
              });
              funcCount = curFuncCount.length;
            }

            let fabCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabCount = fabCount.length;

            if(bool_array[2] && !name_array[2].toLowerCase().trim().includes('all fabrications')) {

              let curFabCount = filterArr.filter((item) => {
                return item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
              });
              fabCount = curFabCount.length;
            }

            let matCount = filterArr.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matCount = matCount.length;

            if(bool_array[3]  && !name_array[3].toLowerCase().trim().includes('all materials')) {

              let curMatCount = filterArr.filter((item) => {
                return item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
              });
              matCount = curMatCount.length;
            }

            let bodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            bodCount = bodCount.length;

            if(bool_array[1]) {

              let curBodCount = filterArr.filter((item) => {
                return item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
              });
              bodCount = curBodCount.length;
            }

            /*
              For twos, take 2 bool arrays
            */

            let funcBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcBodCount = funcBodCount.length;

            if(bool_array[0] && bool_array[1] && !name_array[0].toLowerCase().trim().includes('all functions')) {

              let curFuncBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              funcBodCount = curFuncBodCount.length;
            }



            let matBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matBodCount = matBodCount.length;

            if(bool_array[1] && bool_array[3] && !name_array[3].toLowerCase().trim().includes('all materials')) {

              let curMatBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
              });
              matBodCount = curMatBodCount.length;
            }

            let fabBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabBodCount = fabBodCount.length;

            if(bool_array[1] && bool_array[2] && !name_array[2].toLowerCase().trim().includes('all fabrications')) {

              let curFabBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
              });
              fabBodCount = curFabBodCount.length;
            }



            let fabFuncCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabFuncCount = fabFuncCount.length;

            if(name_array[0].toLowerCase().trim().includes('all functions') && !name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[0] && bool_array[2]) {
                let curFabFuncCount = filterArr.filter((item) => {
                  return (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) &&
                  (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                });
                fabFuncCount = curFabFuncCount.length;
              }
            }

            else if(!name_array[0].toLowerCase().trim().includes('all functions') && name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[0] && bool_array[2]) {
                let curFabFuncCount = filterArr.filter((item) => {
                  return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "") &&
                  (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
                });
                fabFuncCount = curFabFuncCount.length;
              }
            }

            else {

              if(bool_array[0] && bool_array[2]) {
                let curFabFuncCount = filterArr.filter((item) => {
                  return (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) &&
                  (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              
                });
                fabFuncCount = curFabFuncCount.length;
              }
            }



            let matFuncCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFuncCount = matFuncCount.length;

            if(name_array[0].toLowerCase().trim().includes('all functions') && !name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[0] && bool_array[3]) {
                let curMatFuncCount = filterArr.filter((item) => {
                  return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                  (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                });
                matFuncCount = curMatFuncCount.length;
              }
            }

            else if(!name_array[0].toLowerCase().trim().includes('all functions') && name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[0] && bool_array[3]) {
                let curMatFuncCount = filterArr.filter((item) => {
                  return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "") &&
                  (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
                });
                matFuncCount = curMatFuncCount.length;
              }
            }

            else {

              if(bool_array[0] && bool_array[3]) {
                let curMatFuncCount = filterArr.filter((item) => {
                  return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                  (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
                });
                matFuncCount = curMatFuncCount.length;
              }
            }





            let matFabCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFabCount = matFabCount.length;

            if(name_array[2].toLowerCase().trim().includes('all fabrications') && !name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[2] && bool_array[3]) {
                let curMatFabCount = filterArr.filter((item) => {
                  return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                  (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                });
                matFabCount = curMatFabCount.length;
              }
            }

            else if(!name_array[2].toLowerCase().trim().includes('all fabrications') && name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[2] && bool_array[3]) {
                let curMatFabCount = filterArr.filter((item) => {
                  return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "") &&
                  (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
                });
                matFabCount = curMatFabCount.length;
              }
            }

            else {
              if(bool_array[2] && bool_array[3]) {
                let curMatFabCount = filterArr.filter((item) => {
                  return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                  (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
                });
                matFabCount = curMatFabCount.length;
              }
            }




            let matFabFuncCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            matFabFuncCount = matFabFuncCount.length;

            let curMatFabFuncCount = filterArr;
            if(!name_array[0].toLowerCase().trim().includes('all functions')) {

              if(bool_array[2] && bool_array[3] && bool_array[0]) {
                  curMatFabFuncCount = curMatFabFuncCount.filter((item) => {
                  return (
                    item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  )
                });
                matFabFuncCount = curMatFabFuncCount.length;
              }
            }

            if(!name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[2] && bool_array[3] && bool_array[0]) {
                curMatFabFuncCount = curMatFabFuncCount.filter((item) => {
                  return (
                    item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                    || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  )
                });
                matFabFuncCount = curMatFabFuncCount.length;
              }
            }
            console.log(matFabFuncCount);

            if(!name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[2] && bool_array[3] && bool_array[0]) {
                curMatFabFuncCount = curMatFabFuncCount.filter((item) => {
                  return  (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
                });
                matFabFuncCount = curMatFabFuncCount.length;
              }
            }
            console.log(matFabFuncCount);





            let matFabBodCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            matFabBodCount = matFabBodCount.length;

            let curMatFabBodCount = filterArr;

            if(!name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[2] && bool_array[3] && bool_array[1]) {
                 curMatFabBodCount = curMatFabBodCount.filter((item) => {
                  return (
                    item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                    || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  )
                });
                matFabBodCount = curMatFabBodCount.length;
              }
            }

            if(!name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[2] && bool_array[3] && bool_array[1]) {
                  curMatFabBodCount = curMatFabBodCount.filter((item) => {
                  return  (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
                });
                matFabBodCount = curMatFabBodCount.length;
              }
            }

            if(bool_array[2] && bool_array[3] && bool_array[1]) {
              curMatFabBodCount = curMatFabBodCount.filter((item) => {
                return (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              matFabBodCount = curMatFabBodCount.length;
            }



            let funcFabBodCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcFabBodCount = funcFabBodCount.length;
              let curFuncFabBodCount = filterArr;
            if(!name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[2] && bool_array[0] && bool_array[1]) {
                 curFuncFabBodCount = curFuncFabBodCount.filter((item) => {
                  return (
                    item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                    || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  )
                });
                funcFabBodCount = curFuncFabBodCount.length;
              }
            }

            if(!name_array[0].toLowerCase().trim().includes('all functions')) {

              if(bool_array[2] && bool_array[0] && bool_array[1]) {
                curFuncFabBodCount = curFuncFabBodCount.filter((item) => {
                  return (
                    item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  )
                });
                funcFabBodCount = curFuncFabBodCount.length;
              }
            }


            if(bool_array[2] && bool_array[0] && bool_array[1]) {
                curFuncFabBodCount = curFuncFabBodCount.filter((item) => {
                return (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))
              });

              funcFabBodCount = curFuncFabBodCount.length;
            }




            let funcMatBodCount = filterArr.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcMatBodCount = funcMatBodCount.length;

            let curFuncMatBodCount = filterArr;

            if(!name_array[0].toLowerCase().trim().includes('all functions')) {

              if(bool_array[3] && bool_array[0] && bool_array[1]) {
                 curFuncMatBodCount = curFuncMatBodCount.filter((item) => {
                  return (
                    item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  )
                });
                funcMatBodCount = curFuncMatBodCount.length;
              }
            }

            if(!name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[0] && bool_array[3] && bool_array[1]) {
                  curFuncMatBodCount = curFuncMatBodCount.filter((item) => {
                  return  (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
                });
                funcMatBodCount = curFuncMatBodCount.length;
              }
            }

            if(bool_array[3] && bool_array[0] && bool_array[1]) {
                curFuncMatBodCount = curFuncMatBodCount.filter((item) => {
                return (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              funcMatBodCount = curFuncMatBodCount.length;
            }

            let allCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            allCount = allCount.length;
            let curAllCount = filterArr;

            if(!name_array[0].toLowerCase().trim().includes('all functions')) {

              if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
                  curAllCount = curAllCount.filter((item) => {
                  return (
                    item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                    || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  )
                });
                  allCount = curAllCount.length;
              }
            }

            if(!name_array[2].toLowerCase().trim().includes('all fabrications')) {

              if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
                  curAllCount = curAllCount.filter((item) => {
                  return (
                    item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                    || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  )
                });
                allCount = curAllCount.length;
              }
            }

            if(!name_array[3].toLowerCase().trim().includes('all materials')) {

              if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
                  curAllCount = curAllCount.filter((item) => {
                  return  (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                  || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
                });
                allCount = curAllCount.length;
              }
            }

            if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
              curAllCount = curAllCount.filter((item) => {
                return (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))
              });
              allCount = curAllCount.length;
            }

            let w_f = window.innerWidth / 1280;

            if(w_f < 0.7)
              w_f = 0.7
            else if(w_f > 1.3)
              w_f = 1.3

            let h_f = window.innerHeight / 1280;


            if(h_f < 0.9)
              h_f = 0.9
            else if(h_f > 1.1)
              h_f = 1.1


            let w = window.innerWidth * 0.6 * w_f
            let h = window.innerHeight * 0.85 * h_f


            const hexagonSize = { x: 12.5, y:  12.5};
            const closeBtn = <Button size="sm" onClick={this.toggle} color="secondary">{"Close (X)"}</Button>
        const closeBtn2 = <Button onClick={this.toggle2} color="secondary">{"Close (X)"}</Button>
        const closeBtn3 = <Button onClick={this.toggle3} color="secondary">{"Close (X)"}</Button>
           
            return (

            
             <div className="matrixBody">
             {
               
               console.log()
             }
             <div style={{paddingLeft:"50%",height: "10%", display: "flex", color: "white", marginRight:"-2%"}}>

<div className="contact" style={{marginTop: "4%", fontSize: "125%"}} onClick={this.toggle3}>DATASET</div>
<Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal3} toggle={this.toggle3}>
  <ModalHeader close={closeBtn3} style={{backgroundColor: "black", color: "white", height: "12%"}} toggle={this.toggle3}>
  <h2>CHIMERA</h2>Dataset</ModalHeader>

  <ModalBody style={{backgroundColor: "black", overflowY: "auto", height: "90%", width: "100%"}}>

  <div style={{display: "flex"}}>
      <div style={{width: "100%", marginLeft: "1%", color: "white"}}>
        <ol>{namefinalitems} </ol> 
      </div>

     
  </div>
  </ModalBody>
</Modal>
<div className="contribute" style={{marginTop: "4%", marginLeft:"8%", fontSize: "125%"}} onClick={this.toggle}>CONTRIBUTE</div>
<Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal} toggle={this.toggle}>
  <ModalHeader close={closeBtn} style={{backgroundColor: "black", color: "white", height: "8%", padding: "0.5rem 0.5rem"}} toggle={this.toggle}>CONTRIBUTE</ModalHeader>

  <ModalBody style={{backgroundColor: "black", overflowY: "auto", height: "90%", width: "100%"}}>

        <ContributePage />

  </ModalBody>
</Modal>

<div className="contact" style={{marginTop: "4%", marginLeft: "8%", fontSize: "125%"}} onClick={this.toggle2}>CONTACT US</div>
<Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal2} toggle={this.toggle2}>
  <ModalHeader close={closeBtn2} style={{backgroundColor: "black", color: "white", height: "10%"}} toggle={this.toggle2}>Contact Us</ModalHeader>

  <ModalBody style={{backgroundColor: "black", overflowY: "auto", height: "90%", width: "100%"}}>

  <div style={{display: "flex"}}>
      <div style={{width: "47%", marginLeft: "1%", color: "white"}}>

        <h3>Contact Us</h3>
        <div>Name</div>
        <Input style={{ borderRadius: "0px",  padding: "0", height: "10%"}} type="text"/>
        <div>Email Address</div>
        <Input style={{ borderRadius: "0px",  padding: "0", height: "10%"}} type="text"/>
        <div>Subject</div>
        <Input style={{ borderRadius: "0px",  padding: "0", height: "10%"}} type="text"/>
        <div>Message</div>
        <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>

      </div>

      <div style={{width: "47%", marginLeft: "5%", color: "white"}}>

      <h3>Project Contributors</h3>
      </div>
  </div>
  </ModalBody>
</Modal>


</div>
             <div className="matrixSVG">
                        <HexGrid width={760 * w_f} height={window.innerHeight * 0.87} viewBox={"-49 -56 100 100"}>
                        <Layout size={hexagonSize} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>
                                  <linearGradient id="gall" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="33%" stop-color="#E94555" />
                                      <stop offset="66%" stop-color="#3E9FC6" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>
                                    {(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? ((allCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gall)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" font-size="1em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" font-size="1em"fill="black">+ 
                                    {name_array[1]}</tspan><tspan x="0" dy="1.2em" font-size="1em" fill="black">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" font-size="1em" fill="black">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em" fill="black">{"(" + allCount + ")"}</tspan></text></Hexagon>) : (<Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={0} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>)) :
                                     (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-2em">{""}</tspan><tspan x="0" dy="1.2em">
                                   </tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}
                                   
                                   <linearGradient id="gbodfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#E94555" />
                                      <stop offset="100%" stop-color="#3E9FC6" />
                                    </linearGradient>
                                   {(bool_array[1] && bool_array[2]) ? ((fabBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gbodfab)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[2]}</tspan><tspan fill="black" x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text></Hexagon>) : (
                                     <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={0} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                   )) :
                                    (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}

                                    <linearGradient id="gfuncmat" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>
                                  {(bool_array[0] && bool_array[3]) ? ((matFuncCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncmat)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text></Hexagon>) : (
                                    <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={0} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                  )) :
                                   (<Hexagon cellStyle={{fill: "black", stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}
                                    
                                    <linearGradient id="gmatfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#3E9FC6" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>
                                   {(bool_array[2] && bool_array[3]) ? ((matFabCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gmatfab)",stroke:"black"}} onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={1} r={-2} s={0}> <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text></Hexagon>) : (
                                     <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={1} r={-2} s={0}> <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(133, 194, 219)">{name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                   )) :
                                    (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={1} r={-2} s={0}> <text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}

                                    <linearGradient id="gfuncbod" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="100%" stop-color="#E94555" />
                                    </linearGradient>
                                    {(bool_array[0] && bool_array[1]) ? ((funcBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncbod)", stroke:"black"}} onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[1]}</tspan><tspan fill="black" x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text></Hexagon>) : (
                                      <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={-1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                    )) :
                                     (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}

                                    <linearGradient id="gbodmat" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#E94555" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>
                                    {(bool_array[1] && bool_array[3]) ? ((matBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gbodmat)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={2} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text></Hexagon>) : (
                                      <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={2} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                    )) :
                                     (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={2} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}
                                     
                                    
                                    <linearGradient id="gfuncfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="100%" stop-color="#3E9FC6" />
                                    </linearGradient>

                                     {(bool_array[0] && bool_array[2]) ? ((fabFuncCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncfab)",stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-2} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[2]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text></Hexagon>) : (
                                       <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={-2} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                     )) :
                                      (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-2} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.6em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}

                                     <linearGradient id="gfuncbodmat" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="50%" stop-color="#E94555" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>

                                   {(bool_array[0] && bool_array[1] && bool_array[3]) ? ((funcMatBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncbodmat)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>  </Hexagon>) : (
                                     <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={-1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text>  </Hexagon>
                                   )) :
                                    (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.8em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text>  </Hexagon>)}

                                    <linearGradient id="gbodmatfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#E94555" />
                                      <stop offset="50%" stop-color="#3E9FC6" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>
                                      {(bool_array[1] && bool_array[2] && bool_array[3]) ? ((matFabBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gbodmatfab)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="black">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text></Hexagon>) : (
                                        <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                      )) :
                                       (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.8em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}

                                      <linearGradient id="gfuncbodfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="50%" stop-color="#E94555" />
                                      <stop offset="100%" stop-color="#3E9FC6" />
                                    </linearGradient>

                                     {(bool_array[0] && bool_array[1] && bool_array[2]) ? ((funcFabBodCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncbodfab)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[2]}</tspan><tspan fill = "black"x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text></Hexagon>) : (
                                       <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={-1} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                     )) :
                                      (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.8em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}


                                    <linearGradient id="gfuncmatfab" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#71BDAB" />
                                      <stop offset="50%" stop-color="#3E9FC6" />
                                      <stop offset="100%" stop-color="#FDA901" />
                                    </linearGradient>

                                    {(bool_array[0] && bool_array[2] && bool_array[3]) ? ((matFabFuncCount !== 0) ? (<Hexagon cellStyle={{fill: "url(#gfuncmatfab)", stroke:"black"}}onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="black">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="black">+ {name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matFabFuncCount + ")"}</tspan></text></Hexagon>) : (
                                      <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text></Hexagon>
                                    )) :
                                     (<Hexagon cellStyle={{stroke: "rgb(90, 90, 90)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan fill="red" x="0" dy="-1.8em">{""}</tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan><tspan x="0" dy="1.2em"></tspan></text></Hexagon>)}
                                      
                                {(bool_array[2])? ((fabCount !== 0) ? (<Hexagon cellStyle={{fill: "rgb(62,159,198)",stroke: "rgb(37, 96, 120)"}}onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={-2} r={2} s={0}>
                                    <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" font-size="1.2em"fill="black">{name_array[2]}</tspan><tspan x="0" fill="black"dy="1.2em">{"(" + fabCount + ")"}</tspan></text>
                               </Hexagon>) : (
                                 <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}}q={-2} r={2} s={0}>
                                     <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(133, 194, 219)">{name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text>
                                </Hexagon>
                               )) : (<Hexagon cellStyle={{stroke: "rgb(62, 159, 198)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={-2} r={2} s={0}>
                                   <text x="0" y="0" textAnchor="middle"><tspan x="0" font-size="1.5em"fill="rgb(133, 194, 219)">{name_array[2]}</tspan></text>
                              </Hexagon>)}
                              

                              {(bool_array[3]) ? ((matCount !== 0) ? (<Hexagon cellStyle={{fill: "rgb(253,169,1)", stroke: "rgb(156,110,19)"}}onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                                <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" font-size="1.2em"fill="black">{name_array[3]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + matCount + ")"}</tspan></text>
                               </Hexagon>) : (
                                 <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={2} r={-2} s={0}>
                                   <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(254, 205, 102)">{name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text>
                                  </Hexagon>
                               )) : (<Hexagon cellStyle={{stroke: "rgb(253, 169, 1)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                                 <text x="0" y="0" textAnchor="middle"><tspan x="0" font-size="1.5em"fill="rgb(254, 205, 102)">{name_array[3]}</tspan></text>

                                </Hexagon>)}




                            {(bool_array[0]) ? ((funcCount !== 0) ? (<Hexagon cellStyle={{fill:"rgb(113,189,171)", stroke: "rgb(72, 122, 110)"}}onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>
                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" font-size="1.2em" fill="black">{name_array[0]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + funcCount + ")"}</tspan></text>
                           </Hexagon>) : (
                             <Hexagon className="noHover" cellStyle={{stroke: "rgb(90, 90, 90)"}} q={-2} r={0} s={0}>
                               <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text>
                            </Hexagon>
                           )) : (<Hexagon cellStyle={{stroke: "rgb(113, 189, 171)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>
                             <text x="0" y="0" textAnchor="middle"><tspan font-size="1.5em" x="0" fill="rgb(172, 216, 206)">{name_array[0]}</tspan></text>
                          </Hexagon>)}




                          {(bool_array[1]) ? ((bodCount !== 0) ? (<Hexagon cellStyle={{fill:"rgb(233,69,85)", stroke: "rgb(230, 49, 45)"}}onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={2} r={0} s={0}>
                          <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" font-size="1.2em"fill="black">{name_array[1]}</tspan><tspan fill="black"x="0" dy="1.2em">{"(" + bodCount + ")"}</tspan></text>
                         </Hexagon>) : (
                           <Hexagon className="noHover"cellStyle={{stroke: "rgb(90, 90, 90)"}} q={2} r={0} s={0}>
                           <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(No Results)"}</tspan></text>
                          </Hexagon>
                         )) : (<Hexagon cellStyle={{stroke: "rgb(233, 69, 85)", strokeWidth: "0.4", transition: "fill-opacity .5s"}} className="noHover" onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={2} r={0} s={0}>
                         <text x="0" y="0" textAnchor="middle"><tspan font-size="1.5em"x="0" fill="rgb(239,122,134)">{name_array[1]}</tspan></text>
                        </Hexagon>)}


                                {/*<Hexagon q={0} r={2} s={0} stroke="green" fill="purple"/>
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


          </Layout>
        </HexGrid>
                </div>
            </div>
        );
    }

    filterYear = (item) => {

      if(item["Year"] === "")
        return true

      return (item["Year"] >= this.props.minYear && item["Year"] <= this.props.maxYear)
    }

    filterVenue = (item) => {

      return (this.props.venue === 'All' || item["Conference (VENUE)"].toLowerCase() === this.props.venue.toLowerCase())
    }

    filterSource = (item) => {

      if(item["Source"] === "" || item["Source"] === "Both")
        return true

      return (this.props.source === 'Both' || item["Source"].toLowerCase() === this.props.source.toLowerCase())
    }


}

const mapStateToProps = state => {
    return {
        selFunction: state.selFunction,
        selBodyZones: state.selBodyZones,
        selFabrication: state.selFabrication,
        selMaterial: state.selMaterial,
        searchData: state.searchData,

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
        venue: state.venueFilter,
        source: state.sourceFilter,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
        updateQuery: (name_array, query_param) => dispatch({type: actionTypes.UPDATE_QUERY, names: name_array, params: query_param})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
