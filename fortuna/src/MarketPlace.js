//@flow strict
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
  
//This is the MarketPlace Display
class MarketPlace extends React.Component<{||}> {
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
                  <h6>Tank One</h6>
                  <h6>Tank Two</h6>
                  <h6>Tank Three</h6>
                  <h6>Tank Four</h6>
                  <h6>Tank Five</h6>
                  <h6>Tank Six</h6>
                  <h6>Tank Seven</h6>
                  <h6>Tank Eight</h6>
              </div>
              <div class = "col-md-4">
                  <h2 class = "text-center">Selected Tank</h2>
              </div>
              <div class = "col-md-4">
                  <h2 class = "text-right">Components</h2>
                  <h6 class = "text-right">Tank One Cannon</h6>
                  <h6 class = "text-right">Tank One Tracks</h6>
                  <h6 class = "text-right">Tank One Scanner</h6>
                  <h6 class = "text-right">Tank One Jammer</h6>
                  <h6 class = "text-right">Tank One Base</h6>
              </div>
          </div>
        </div>
    );
  }
}

export default MarketPlace;
