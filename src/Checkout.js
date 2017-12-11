import React, { button, Component } from "react";
import {CardElement} from 'react-stripe-elements';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCharge: "None"
    };
    this.createCharge = this.createCharge.bind(this);
  }

  createCharge() {
    this.setState(
      {
        latestCharge: "Creating token..."
      },
      () => {
        this.props
          .postPublic("tokens", {
            "card[number]": "4242424242424242",
            "card[exp_month]": "02",
            "card[exp_year]": "2018"
          })
          .then(token => {
            this.setState({
              latestCharge: "Create charges..."
            });

            return this.props.postSecret("charges", {
              amount: 2000,
              currency: "usd",
              description: "test charde",
              source: token.id
            });
          })
          .then(charge => {
            this.setState({
              latestCharge: charge.id
            });
          });
      }
    );
  }

  render() {
    return (
      <div>
        <h2>Checkout</h2>

        <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>

        <button onClick={this.createCharge}>Charge</button>
        <p>latestCharge: {this.state.latestCharge}</p>
      </div>
    );
  }
}
