import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'rc-slider/assets/index.css';
import './filterBody.css'
import Slider from 'rc-slider';
import * as actionTypes from '.././store/actions';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ButtonDropdown, Progress, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import ColCharts from './ColCharts'
import BodyChart from './BodyChart'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Label } from 'semantic-ui-react'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = Slider.Range;

class FilterBody extends Component {

  /*
    Make the UI changes using reactstrap
  */

    constructor(props) {
          super(props);



        this.toggle = this.toggle.bind(this);
          this.state = {
            dropdownOpen: false,
            venue: 'All',
            modal: false,
            showLabels: true,

            sourceInit: 0,

            metricsModal: 0,
          };
    }

    toggleStats = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));

      this.props.filterToggle();

    }

    toggleMetrics = () => {
      this.setState(prevState => ({
        metricsModal: !prevState.metricsModal
      }));
    }

    toggle() {

      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen,
        showLabels: !prevState.showLabels
      }));
   }

     onChange = (value) => {

       console.log(value[1]);

      this.props.filterData();
      this.props.filterYear(value[0], value[1]);
    }

    onVenueClick = (value) => {

      let val = value.split(" (");

      console.log(val[0]);
      this.setState({
        venue: val[0],
      });

      this.props.filterVenue(val[0]);
    }

    onSourceClick = (value) => {

      let temp = value;

      if(value === 'Engineering') {

        if(this.props.source === 'Engineering')
          temp = "Both"
        else {
          temp = "Engineering"
        }

      }
      else if(value === 'Fashion') {

        if(this.props.source === 'Fashion')
          temp = "Both"
        else {
          temp = "Fashion"
        }
      }




    this.props.filterSource(temp);
    }

    render() {

      let w = window.innerWidth / 1280;
      let h = window.innerHeight / 610;

      let venueArr = this.props.searchData;

      if(!this.props.mainPage) {

        venueArr = this.props.curSearchData
      }
      venueArr = venueArr.map((venue) => venue["Conference (VENUE)"]);
      venueArr.unshift('All')

      venueArr = venueArr.map((venue) => {

        if(this.props.mainPage) {
              if(venue === 'All')
                  return venue + " (" + this.props.searchData.length + ")";

              let temp = this.props.searchData.filter((item) => item["Conference (VENUE)"].toLowerCase() === venue.toLowerCase());


              return venue + " (" + temp.length + ")";
          }
          else {

            if(venue === 'All')
              return venue + " (" + this.props.curSearchData.length + ")";
            let temp = this.props.curSearchData.filter((item) => item["Conference (VENUE)"].toLowerCase() === venue.toLowerCase());

            return venue + " (" + temp.length + ")";
          }
          return venue;

      });


      let myData = this.props.searchData;

      if(!this.props.mainPage) {
        myData = this.props.curSearchData
      }
      let filterEngineering = myData.filter((item) => {
        return (item["Source"] === "Engineering" || item["Source"] === "Both")
      });

      let filterFashion = myData.filter((item) => {
        return (item["Source"] === "Fashion" || item["Source"] === "Both")
      });

      let engLength = filterEngineering.length;
      let fashLength = filterFashion.length;

      engLength = engLength * 100 / (engLength + fashLength);
      fashLength = 100 - engLength;

      venueArr = [...new Set(venueArr)];

      venueArr = venueArr.map((venue) => {
        return (
          <DropdownItem onClick={() => this.onVenueClick(venue)}>{venue}</DropdownItem>
        )
      });

      const style = { width: 400 * w, margin: 50 * w};

      const dataPie = [
          {value: 25, color: "black", title: "Function"},
          {value: 50, color: "red", title: "BodyZones"},
          {value: 30, color: "green", title: "Material"},
          {value: 20, color: "blue", title: "Fabrication"},
      ]


      let yearData = [];

      for(let i = 1990; i <= 2019; i++) {

        let temp = myData.filter((item) => {

          return item["Year"] === i.toString();
        })

        yearData = [
            ...yearData,
            {
              name: i.toString(),
              Projects: temp.length,
            }
        ];
      }

        const closeBtn = <Button onClick={this.toggleStats} color="secondary">{"Close (X)"}</Button>
        const closeBtnMetrics = <Button onClick={this.toggleMetrics} color="secondary">{"Close (X)"}</Button>
      return (
          <div>
              <div style={{ marginTop: "1%", fontSize: "120%"}}>Time Frame</div>
              <BarChart width={260 * w} height={150 * h} data={yearData}
                  margin={{top: 5 * h, left: 0, bottom: 0}}>
                  <XAxis dataKey="name" hide={true}/>
                  <Tooltip cursor={false}/>
                  <Bar dataKey="Projects" />
             </BarChart>

              <Range handleStyle={[{ backgroundColor: 'black'}, {backgroundColor: 'black' }]} trackStyle={[{ backgroundColor: 'grey', height: 6 * h + "px"}]}
              allowCross={false}  railStyle={{ backgroundColor: 'black' }} min={1990} max={2019} defaultValue={[this.props.minYear, this.props.maxYear]} onChange={(value) => this.onChange(value)} />
              <div>{this.props.minYear}<span style={{float: "right"}}>{this.props.maxYear}</span></div>

              <div style={{ marginTop: "1%", fontSize: "120%"}}>Publication Venue</div>
              <ButtonDropdown style={{width:"100%", height: 20 * h + 'px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle style={{backgroundColor: "white", color: "black"}} caret>
                        <div style={{ transform: "translateY(-25%)"}}>{this.state.venue}</div>
                      </DropdownToggle>
                      <DropdownMenu className="dropdownStyle" style={{width:"100%", overflowY:"scroll", height: window.innerHeight * 0.4}}>
                        {venueArr}
                      </DropdownMenu>
              </ButtonDropdown>

              <div style={{ marginTop: "4%", fontSize: "120%"}}>Filter by:</div>
              <div style={{marginTop: "2%"}}>
              {(this.props.source === 'HCI') ? (<Button style={{width: "40%", transform: "translateX(20%)"}} className="btnSelector" onClick={() => this.onSourceClick("HCI")}>HCI</Button>)
                  : (<Button style={{width: "40%", transform: "translateX(20%)"}} className="btnSelectorClicked" onClick={() => this.onSourceClick("HCI")}>HCI</Button>)}
             
                {(this.props.source === 'Fashion') ? (<Button className="btnSelector" style={{float: "right", width: "40%", transform: "translateX(-20%)"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)
                 : (<Button className="btnSelectorClicked" style={{float: "right", width: "40%", transform: "translateX(-20%)"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)}
              </div>
              <div style={{marginTop: "2%"}}>
             
                {(this.props.source === 'Technology') ? (<Button style={{width: "40%", transform: "translateX(20%)"}} className="btnSelector" onClick={() => this.onSourceClick("Technology")}>Technology</Button>)
                  : (<Button style={{width: "40%", transform: "translateX(20%)"}} className="btnSelectorClicked" onClick={() => this.onSourceClick("Engineering")}>Technology</Button>)}
              </div>
              <div style={{textAlign: "center"}}>
                  {(this.props.source === 'HCI') ? (<div>HCI</div>) : (this.props.source === 'Technology') ? (<div>Technology</div>)
                   : ((this.props.source === "Fashion") ? (<div>Fashion</div>) : (<div>HCI + Fashion + Technology</div>))}
              </div>
              <div style={{ marginTop: "3%", fontSize: "120%"}}>
                % Contribution
              </div>
              <div style={{marginTop: '3%'}}>
                {(this.state.showLabels) ? (<><Label style={{transform: "translateY(4px)", backgroundColor: "#f98686"}} key="Orange" />{' '}<span>Engineering</span>{' '}
                <Label style={{transform: "translateY(4px)"}} color="red" key="red" />{' '}<span>Fashion</span>{' '}</>) : (<div style={{height: "2vh"}}>Placeholder</div>)}

                  <br />
                  <div>
                  <br />
                  <Progress multi>
                    <Progress className="engStyle" bar value={engLength} />
                    <Progress bar color="danger" value={fashLength} />
                  </Progress>
                  </div>
              </div>

              <div style={{marginTop: "8%", marginLeft: "20%"}}>
                <Button className="btnSelectorEnd" style={{width: "75%"}} onClick={this.toggleDisplay}>{(this.props.listView) ? ("View Results in Original Form") : ("View Results in List Form")}</Button>{' '}
              </div>

              {(this.props.loggedIn) ? (<div style={{marginTop: "5%", marginLeft: "20%"}}>
                <Button className="btnSelectorEnd" style={{width: "75%"}} onClick={this.toggleBookmarks}>{(this.props.viewBookmarks) ? ("View all Results") : ("View Pinned/Bookmarks")}</Button>{' '}
              </div>) : (<div/>)}

              <div style={{marginTop: "5%", marginLeft: "20%", zIndex: "2500 !important"}}>


                      <Button className="btnSelectorEnd" style={{width: "75%"}} onClick={this.toggleStats}>Database Statistics</Button>

                      <Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader close={closeBtn} style={{backgroundColor: "black", color: "white"}} toggle={this.toggleStats}>Database Statistics</ModalHeader>

                        <ModalBody style={{backgroundColor: "black", overflowY: "auto"}}>

                            <div style={{display: "flex", height: "49%"}}>
                               <ColCharts label="Function" />
                               <ColCharts label="Material" />
                            </div>

                            <div style={{display: "flex",height: "49%", marginTop: "2%"}}>
                               <ColCharts label="Fabrication" />
                               <BodyChart />
                            </div>

                        </ModalBody>

                      </Modal>
           </div>

           <div style={{marginTop: "5%", marginLeft: "20%"}}>


                   <Button className="btnSelectorEnd" style={{width: "75%"}} onClick={this.toggleMetrics}>Metrics Description</Button>

                   <Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.metricsModal}>
                     <ModalHeader close={closeBtnMetrics} style={{backgroundColor: "black", color: "white"}}>Metrics Description</ModalHeader>

                     <ModalBody style={{backgroundColor: "black", overflowY: "scroll"}}>

                        <div>


                              <div style={{marginTop: "2.5%"}}>
                                <div style={{ textAlign: "center", color: "white", padding: "1% 20% 1% 20%"}}>
                                    <h5 style={{}}>Cost Metric</h5>
                                    <p>To generate the cost rating system of the CHIMERA resources, we made classify the categories Fabrication and Material according to the cost of each one using USA costs as references. This analysis generates a 3 level ranking expressed by symbols on the interface ($ - $$ - $$$). This provides the user a matric that allow to compare between resources in terms of cost of implementation.</p>

                                    <p>

                                    The elements of each main category were classified from low to high cost, and then grouped in three common groups of price level. We applied a scale of 1-3-9 being 1 the lowest cost representation and 9 the highest. Then we grade each of the resources on the database according to what elements in Fabrication and materials uses. Then these values are combined when the user makes the correlations on the interface. This correlation generates another three level ranking of the cost that results in the selection of the corresponding symbol of $, $$, or $$$ presented on the low right corner of each work included in CHIMERA’s results page. In case a project presents multiple fabrication steps or multiple materials, the system selects the one with the highest value in the list and proceeds to generate the comparisons.
                                    </p>

                                    <div>
                                          COST LEVEL: Highest Fabrication Value + Highest Material value
                                    </div>


                                    </div>

                                <img src={"ImageDatabase/Icons/Metrics2.jpg"}
                                 alt="" style={{width: '90%', height: "60%", marginLeft: "5%", objectFit: "cover"}}/>
                               </div>

                               <div style={{marginTop: "-25%", color: "white", textAlign: "center", padding: "1% 20% 1% 20%"}}>
                                     <div style={{marginTop: "5%", color: "white"}}><h4>Wearability Metric</h4></div>

                                     <div>
                                       <p>The metrics used to evaluate the physical wearability of the current work in wearable devices was developed by a combination of criteria. Six principles categories for grading were evaluated for each one of the works included in the interface, which represent basic components and principles of what conforms a wearable device. This principle answer questions of How does the wearable attaches to the body? What is the maintenance level required? What is the impact in body movement and in regular activities? What is the level of integration of the elements in the garment/device? In which contexts the wearable is useful? and What is the level of Aesthetics considered (Aesthetics vs Functionality)?
                                       </p>

                                     <p>By analyzing each work, we generate the evaluation ranking for wearability. This ranking will add all the points given in each one of the six categories and categorize in five defined groups described in Figure 1.</p>
                                     </div>
                                     <img src={"ImageDatabase/Icons/Metrics4.jpg"}
                                      alt="" style={{width: '60%', height: "60%", marginTop: "2%", objectFit: "cover"}}/>

                                      <div style={{marginTop: "-7.5%"}}>
                                      <p>Each principle considered grading is shown in the tables below.
                                       This grading system helps to differentiate between selections, generate groups, and avoid the tendency to grade most of the elements around a
                                        mean point. This type of scale is used in design process to define priorities of the elements in a particular design.</p>

                                        <p>This ranking will help the user analyze the presented work before accessing the information. The Higher in the scale the more optimal to wear it is. Depending on the users’ needs this information can help filter and identify desired requirements.</p>

                                        <div>The following table shows an example on how the metric is calculated for each resource.</div>
                                      </div>
                                     <img src={"ImageDatabase/Icons/Metrics1.jpg"}
                                      alt="" style={{width: '80%', height: "60%",  marginTop: "2.5%", marginLeft: '5%', objectFit: "cover"}}/>

                                      <div style={{marginTop: "-7.5%"}}>Points assigned for each category to calculate Wearability: </div>
                                       <img src={"ImageDatabase/Icons/Metrics3.jpg"}
                                        alt="" style={{width: '80%', height: "60%", marginTop: "0%", marginLeft: '5%', objectFit: "cover"}}/>

                              </div>

                              <div style={{ textAlign: "center", color: "white", padding: "1% 20% 1% 20%"}}>
                                  <h5 style={{}}>Implementation Metric</h5>
                                  <p>This metric compares resources in terms of how complex and time-consuming their Fabrication and Functionality are. Each resource is allocated two main Fabrication methods, and three main Function methods. Both category elements were ranked from lower to
                                   higher complexity and grouped using the 1-3-9 scale (similar to the Cost metric) [18]. Using this scale, the Fabrication values were added together and the result multiplied by the highest-ranked value in the Function category. The resulting Implementation
                                    Complexity level is displayed using a traffic light metaphor with the colors green, yellow, and red, where green means a short or relatively straightforward predicted implementation, and red a high predicted implementation in terms of complexity and time.
                                     There are a number of exceptions to this metric where the rating of the implementation time cannot be calculated due to the nature of the source. Examples include design patents (i.e. drawings of a design with no material, fabrication or function specification), design concepts that have not yet been implemented and behavioral research (i.e. studies on how people use or interact with wearables). These exceptions are displayed as white blocks with an X in the center.</p>

                             </div>


                        </div>

                     </ModalBody>

                   </Modal>
        </div>

           <div>
               <img className="homeButton" src={"ImageDatabase/Icons/Home.png"}
                alt="" style={{width: '50%', marginLeft: "25%", marginTop: "5%", objectFit: "cover"}}/>
           </div>

          </div>
        );
    }


    toggleDisplay = () => {

      this.props.toggleDisplay();
    }

    toggleBookmarks = () => {

      this.props.toggleBookmarks();
    }

}

const mapDispatchToProps = dispatch => {
    return {

        filterData: () => dispatch({type: actionTypes.FILTER_DATA}),
        filterYear: (minYear, maxYear) => dispatch({type: actionTypes.FILTER_YEAR, minYear: minYear, maxYear: maxYear}),
        filterVenue: (venue) => dispatch({type: actionTypes.FILTER_VENUE, val: venue}),
        filterSource: (source) => dispatch({type: actionTypes.FILTER_SOURCE, val: source}),
        toggleDisplay: () => dispatch({type: actionTypes.TOGGLE_DISPLAY}),
        toggleBookmarks: () =>  dispatch({type: actionTypes.VIEW_BOOKMARKS}),

    }
};

const mapStateToProps = state => {
    return {

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
        venue: state.venueFilter,
        source: state.sourceFilter,
        searchData: state.searchData,
        listView: state.listView,
        viewBookmarks: state.viewBookmarks,

        loggedIn: state.isLoggedIn,

        curSearchData: state.currentFilteredArray,

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);
