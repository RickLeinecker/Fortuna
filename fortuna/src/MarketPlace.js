import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
  
  //This is the MarketPlace Display
  class MarketPlaceDisplay extends React.Component {
    render(){
      return (
        <div id = "Parent">
            <div class = "row">
                <div class = "col-md-4"><button type="button" class="btn btn-secondary btn-lg">&lt;-Back to Main Menu</button></div>
                <h1 class = "col-md-4 text-center">MarketPlace</h1>
                <h4 class = "col-md-4 text-right">Currency: $9432</h4>
            </div>
            <div class = "row mt-5">
                <div class = "col-md-4">
                    <h2>Available Tanks</h2>
                </div>
                <div class = "col-md-4">
                    <h2 class = " text-center">Selected Tank</h2>
                </div>
                <div class = "col-md-4">
                    <h2 class = " text-right">Search by Creator</h2>
                </div>
            </div>
          </div>
      );
    }
  
  }

  export default MarketPlaceDisplay